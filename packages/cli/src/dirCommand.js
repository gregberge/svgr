/* eslint-disable no-underscore-dangle, no-console */
import fs from 'fs'
import { promisify } from 'util'
import path from 'path'
import chalk from 'chalk'
import outputFileSync from 'output-file-sync'
import readdir from 'recursive-readdir'
import { convertFile, stat, transformFilename, CASE, politeWrite } from './util'

const access = promisify(fs.access)

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

async function dirCommand(
  program,
  filenames,
  { ext = 'js', filenameCase = CASE.PASCAL, ...options },
) {
  async function write(src, relative) {
    if (!isCompilable(relative)) return
    relative = rename(relative, ext, filenameCase)

    const dest = path.resolve(program.outDir, relative)
    const code = await convertFile(src, options)

    if (program.ignoreExisting && (await exists(dest))) {
      politeWrite(
        program,
        chalk.grey(`${src} -> ${path.relative(process.cwd(), dest)}\n`),
      )
      return
    }

    outputFileSync(dest, code)
    politeWrite(
      program,
      chalk.white(`${src} -> ${path.relative(process.cwd(), dest)}\n`),
    )
  }

  async function handle(filename) {
    const stats = await stat(filename)

    if (stats.isDirectory(filename)) {
      const dirname = filename
      const files = await readdir(dirname)
      await Promise.all(
        files.map(async _filename => {
          const relative = path.relative(dirname, _filename)
          return write(_filename, relative)
        }),
      )
    } else {
      await write(filename, filename)
    }
  }

  await Promise.all(filenames.map(handle))
}

export default dirCommand
