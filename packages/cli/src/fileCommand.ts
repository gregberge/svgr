/* eslint-disable no-underscore-dangle */
import { promises as fs } from 'fs'
import { convert, convertFile, exitError } from './util'
import type { SvgrCommand } from './index'

const readStdin = async () => {
  return new Promise<string>((resolve) => {
    let code = ''
    process.stdin.setEncoding('utf8')
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read()
      if (chunk !== null) code += chunk
    })
    process.stdin.on('end', () => {
      resolve(code)
    })
  })
}

export const fileCommand: SvgrCommand = async (
  opts,
  program,
  filenames,
): Promise<void> => {
  if (opts.stdin || (filenames.length === 0 && !process.stdin.isTTY)) {
    const input = await readStdin()
    const output = convert(input, opts, { filePath: opts.stdinFilepath })
    process.stdout.write(`${output}\n`)
    return
  }

  if (filenames.length === 0) {
    process.stdout.write(`${program.helpInformation()}\n`)
    return
  }

  if (filenames.length > 1) {
    exitError('Please specify only one filename or use `--out-dir` option.')
  }

  const [filename] = filenames
  const stats = await fs.stat(filename)

  if (stats.isDirectory()) {
    exitError('Directory are not supported without `--out-dir` option instead.')
  }

  const output = await convertFile(filename, opts)
  process.stdout.write(`${output}\n`)
}
