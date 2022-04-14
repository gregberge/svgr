/* eslint-disable no-underscore-dangle, no-console */
import { promises as fs } from 'fs'
import * as path from 'path'
import { grey, white } from 'chalk'
import { loadConfig, Config } from '@svgr/core'
import { format, resolveConfig } from 'prettier'
import {
  convertFile,
  transformFilename,
  politeWrite,
  formatExportName,
} from './util'
import type { Options, SvgrCommand } from './index'

const exists = async (filepath: string) => {
  try {
    await fs.access(filepath)
    return true
  } catch (error) {
    return false
  }
}

const rename = (relative: string, ext: string, filenameCase: string) => {
  const relativePath = path.parse(relative)
  relativePath.ext = `.${ext}`
  relativePath.base = ''
  relativePath.name = transformFilename(relativePath.name, filenameCase)
  return path.format(relativePath)
}

export const isCompilable = (filename: string): boolean => {
  const ext = path.extname(filename)
  return ext === '.svg' || ext == '.SVG'
}

export interface IndexTemplate {
  (paths: string[]): string
}

const defaultIndexTemplate: IndexTemplate = (paths) => {
  const exportEntries = paths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const exportName = formatExportName(basename)
    return `export { default as ${exportName} } from './${basename}'`
  })
  return exportEntries.join('\n')
}

const resolveExtension = (
  config: Config,
  ext: string | null | undefined,
  jsx: boolean,
) => ext || (config.typescript ? (jsx ? 'tsx' : 'ts') : 'js')

export const dirCommand: SvgrCommand = async (
  opts,
  _,
  filenames,
): Promise<void> => {
  const {
    ext: extOpt,
    filenameCase = 'pascal',
    ignoreExisting,
    silent,
    configFile,
    outDir,
  } = opts

  const ext = resolveExtension(opts, extOpt, true)

  const write = async (src: string, dest: string) => {
    if (!isCompilable(src)) {
      return { transformed: false, dest: null }
    }

    dest = rename(dest, ext, filenameCase)
    const code = await convertFile(src, opts)
    const cwdRelative = path.relative(process.cwd(), dest)
    const logOutput = `${src} -> ${cwdRelative}\n`

    if (ignoreExisting && (await exists(dest))) {
      politeWrite(grey(logOutput), silent)
      return { transformed: false, dest }
    }

    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.writeFile(dest, code)
    politeWrite(white(logOutput), silent)
    return { transformed: true, dest }
  }

  const generateIndex = async (
    dest: string,
    files: string[],
    opts: Options,
  ) => {
    const ext = resolveExtension(opts, extOpt, false)
    const filepath = path.join(dest, `index.${ext}`)
    const indexTemplate = opts.indexTemplate || defaultIndexTemplate
    const fileContent = indexTemplate(files)
    const prettyContent = await (async () => {
      if (!opts.prettier) return fileContent
      const prettierRcConfig = opts.runtimeConfig
        ? await resolveConfig(filepath, { editorconfig: true })
        : {}
      return format(fileContent, {
        filepath,
        ...prettierRcConfig,
        ...opts.prettierConfig,
      })
    })()
    await fs.writeFile(filepath, prettyContent)
  }

  async function handle(filename: string, root: string) {
    const stats = await fs.stat(filename)

    if (stats.isDirectory()) {
      const dirname = filename
      const files = await fs.readdir(dirname)
      const results = await Promise.all(
        files.map(async (relativeFile) => {
          const absFile = path.join(dirname, relativeFile)
          return handle(absFile, root)
        }),
      )
      const transformed = results.filter((result) => result.transformed)
      if (transformed.length) {
        const destFiles = results
          .map((result) => result.dest)
          .filter(Boolean) as string[]
        const dest = path.resolve(
          outDir as string,
          path.relative(root, dirname),
        )
        const resolvedConfig = loadConfig.sync(
          { configFile, ...opts },
          { filePath: dest },
        ) as Options
        if (resolvedConfig.index) {
          await generateIndex(dest, destFiles, opts)
        }
      }
      return { transformed: false, dest: null }
    }

    const dest = path.resolve(outDir as string, path.relative(root, filename))
    return write(filename, dest).catch(err => {
      console.error('Failed to handle file: ', filename)
      throw err
    })
  }

  await Promise.all(
    filenames.map(async (file) => {
      const stats = await fs.stat(file)
      const root = stats.isDirectory() ? file : path.dirname(file)
      await handle(file, root)
    }),
  )
}
