/* eslint-disable no-underscore-dangle, no-console */
import fs from 'fs'
import { promisify } from 'util'
import path from 'path'
import chalk from 'chalk'
import outputFileSync from 'output-file-sync'
import { loadConfig } from '@svgr/core'
import { convertFile, stat, transformFilename, CASE, politeWrite } from './util'

const access = promisify(fs.access)
const readdir = promisify(fs.readdir)

async function exists(file) {
  try {
    await access(file)
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
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
    return `export { default as ${exportName} } from './${basename}'`
  })
  return exportEntries.join('\n')
}

function getDefaultExtension(options) {
  return options.typescript ? 'tsx' : 'js'
}

export default async function dirCommand(
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

    if (program.ignoreExisting && (await exists(dest))) {
      politeWrite(program, chalk.grey(logOutput))
      return { transformed: false, dest }
    }

    outputFileSync(dest, code)
    politeWrite(program, chalk.white(logOutput))
    return { transformed: true, dest }
  }

  async function generateIndex(dest, files) {
    const indexFile = path.join(dest, `index.${ext}`)
    const config = loadConfig.sync(options, { filePath: indexFile })
    const indexTemplate = config.indexTemplate || defaultIndexTemplate
    fs.writeFileSync(indexFile, indexTemplate(files))
  }

  async function handle(filename, root) {
    const stats = await stat(filename)

    if (stats.isDirectory()) {
      const dirname = filename
      const files = await readdir(dirname)
      const results = await Promise.all(
        files.map(async (relativeFile) => {
          const absFile = path.join(dirname, relativeFile)
          return handle(absFile, root)
        }),
      )
      const transformed = results.filter((result) => result.transformed)
      if (transformed.length) {
        const destFiles = results.map((result) => result.dest).filter(Boolean)
        const dest = path.resolve(program.outDir, path.relative(root, dirname))
        await generateIndex(dest, destFiles)
      }
      return { transformed: false, dest: null }
    }

    const dest = path.resolve(program.outDir, path.relative(root, filename))
    return write(filename, dest)
  }

  await Promise.all(
    filenames.map(async (file) => {
      const stats = await stat(file)
      const root = stats.isDirectory() ? file : path.dirname(file)
      await handle(file, root)
    }),
  )
}
