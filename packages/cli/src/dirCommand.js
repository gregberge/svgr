/* eslint-disable no-underscore-dangle, no-console */
import { promises as fs } from 'fs'
import path from 'path'
import chalk from 'chalk'
import { loadConfig } from '@svgr/core'
import {
  convertFile,
  transformFilename,
  CASE,
  politeWrite,
  formatExportName,
} from './util'

async function exists(file) {
  try {
    await fs.access(file)
    return true
  } catch (error) {
    return false
  }
}

function rename(relative, ext, filenameCase) {
  const relativePath = path.parse(relative)
  relativePath.ext = `.${ext}`
  relativePath.base = null
  relativePath.name = transformFilename(relativePath.name, filenameCase)

  return path.format(relativePath)
}

const COMPILABLE_EXTENSIONS = ['.svg', '.SVG']

export function isCompilable(filename) {
  const ext = path.extname(filename)
  return COMPILABLE_EXTENSIONS.includes(ext)
}

function defaultIndexTemplate(filePaths) {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const exportName = formatExportName(basename)
    return `export { default as ${exportName} } from './${basename}'`
  })
  return exportEntries.join('\n')
}

function getDefaultExtension(options) {
  return options.typescript ? 'tsx' : 'js'
}

export default async function dirCommand(
  opts,
  program,
  filenames,
  { ext, filenameCase = CASE.PASCAL, ...options },
) {
  async function write(src, dest) {
    if (!isCompilable(src)) return { transformed: false, dest: null }

    ext = ext || getDefaultExtension(options)
    dest = rename(dest, ext, filenameCase)
    const code = await convertFile(src, options)
    const cwdRelative = path.relative(process.cwd(), dest)
    const logOutput = `${src} -> ${cwdRelative}\n`

    if (opts.ignoreExisting && (await exists(dest))) {
      politeWrite(opts, chalk.grey(logOutput))
      return { transformed: false, dest }
    }

    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.writeFile(dest, code)
    politeWrite(opts, chalk.white(logOutput))
    return { transformed: true, dest }
  }

  async function generateIndex(dest, files, config) {
    const indexFile = path.join(dest, `index.${ext}`)
    const indexTemplate = config.indexTemplate || defaultIndexTemplate
    await fs.writeFile(indexFile, indexTemplate(files))
  }

  async function handle(filename, root) {
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
        const destFiles = results.map((result) => result.dest).filter(Boolean)
        const dest = path.resolve(opts.outDir, path.relative(root, dirname))
        const config = loadConfig.sync(options, { filePath: dest })
        if (config.index) {
          await generateIndex(dest, destFiles, config)
        }
      }
      return { transformed: false, dest: null }
    }

    const dest = path.resolve(opts.outDir, path.relative(root, filename))
    return write(filename, dest)
  }

  await Promise.all(
    filenames.map(async (file) => {
      const stats = await fs.stat(file)
      const root = stats.isDirectory() ? file : path.dirname(file)
      await handle(file, root)
    }),
  )
}
