/* eslint-disable no-underscore-dangle */
import { stat, convert, convertFile, exitError } from './util'

async function output(promise) {
  process.stdout.write(`${await promise}\n`)
}

async function fileCommand(program, filenames, config) {
  function stdin() {
    let code = ''

    process.stdin.setEncoding('utf8')

    process.stdin.on('readable', () => {
      const chunk = process.stdin.read()
      if (chunk !== null) code += chunk
    })

    process.stdin.on('end', () => {
      output(convert(code, config))
    })
  }

  if (filenames.length === 0) {
    stdin()
    return
  }

  if (filenames.length > 1) {
    exitError('Please specify only one filename or use `--out-dir` option.')
    return
  }

  const [filename] = filenames
  const stats = await stat(filename)

  if (stats.isDirectory()) {
    exitError('Directory are not supported without `--out-dir` option instead.')
  }

  output(convertFile(filename, config))
}

export default fileCommand
