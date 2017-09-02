/* eslint-disable no-console */
import chalk from 'chalk'
import { extname } from 'path'
import fs from 'mz/fs'
import readdir from 'recursive-readdir'
import { rawConvert } from '../'

export { rawConvert }

export async function convertFile(filePath, opts) {
  const code = await fs.readFile(filePath, 'utf-8')
  return rawConvert(code, opts, { filePath })
}

export function exitError(error) {
  console.error(chalk.red(error))
  process.exit(1)
}

export { readdir }

export async function readdirFilter(dirname) {
  return (await readdir(dirname)).filter(isCompilableExtension)
}

const COMPILABLE_EXTENSIONS = ['.svg', '.SVG']

export function isCompilableExtension(filename) {
  const ext = extname(filename)
  return COMPILABLE_EXTENSIONS.includes(ext)
}
