/* eslint-disable no-underscore-dangle, no-console */
import path from 'path'
import outputFileSync from 'output-file-sync'
import readdir from 'recursive-readdir'
import { pascalCase } from '@svgr/core'
import { stat, convertFile } from './util'

function rename(relative, ext) {
  const relativePath = path.parse(relative)
  relativePath.ext = `.${ext}`
  relativePath.name = pascalCase(relativePath.name)
  relativePath.base = null

  return path.format(relativePath)
}

const COMPILABLE_EXTENSIONS = ['.svg', '.SVG']

export function isCompilable(filename) {
  const ext = path.extname(filename)
  return COMPILABLE_EXTENSIONS.includes(ext)
}

async function dirCommand(program, filenames, { ext = 'js', ...options }) {
  async function write(src, relative) {
    if (!isCompilable(relative)) return false
    relative = rename(relative, ext)

    const dest = path.join(program.outDir, relative)
    const code = await convertFile(src, options, { filePath: dest })

    outputFileSync(dest, code)
    console.log(`${src} -> ${dest}`)
    return true
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
