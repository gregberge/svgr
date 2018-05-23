/* eslint-disable no-underscore-dangle */
import fs from 'mz/fs'
import convert from '../'
import { readdirFilter, convertFile } from './util'

async function fileCommand(program, filenames, config) {
  let conversions

  function stdin() {
    conversions = []
    let code = ''

    process.stdin.setEncoding('utf8')

    process.stdin.on('readable', () => {
      const chunk = process.stdin.read()
      if (chunk !== null) code += chunk
    })

    process.stdin.on('end', () => {
      conversions.push(convert(code, config))
      output()
    })
  }

  async function output() {
    const results = await Promise.all(conversions)
    process.stdout.write(`${results.join('\n\n')}\n`)
  }

  async function walk() {
    const _filenames = []
    conversions = []

    await Promise.all(
      filenames.map(async filename => {
        const stat = await fs.stat(filename)
        if (stat.isDirectory()) {
          const dirname = filename
          ;(await readdirFilter(dirname)).forEach(_filename => {
            _filenames.push(_filename)
          })
        } else {
          _filenames.push(filename)
        }
      }),
    )

    _filenames.forEach(_filename => {
      conversions.push(convertFile(_filename, config))
    })

    output()
  }

  if (filenames.length === 0) stdin()
  else await walk()
}

export default fileCommand
