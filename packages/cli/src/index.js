/* eslint-disable no-console */
import program from 'commander'
import path from 'path'
import fs from 'mz/fs'
import glob from 'glob'
import uniq from 'lodash/uniq'
import pkg from '../package.json'
import fileCommand from './fileCommand'
import dirCommand from './dirCommand'

const argsToObject = (arg, accumulation = {}) => {
  const [name, value] = arg.split('=')
  return { ...accumulation, [name]: value }
}

program
  .version(pkg.version)
  .usage('[options] <file>')
  .option('--config <file>', 'specify the path of the svgr config')
  .option('-d, --out-dir <dirname>', 'output files into a directory')
  .option('--ext <ext>', 'specify a custom file extension (default: "js")')
  .option('--icon', 'use "1em" as width and height')
  .option('--native', 'add react-native support with react-native-svg')
  .option('--ref', 'add svgRef prop to svg')
  .option('--no-dimensions', 'remove width and height from root SVG tag')
  .option('--no-expand-props', 'disable props expanding')
  .option(
    '--svg-attributes [property=value]',
    'add some attributes to the svg',
    argsToObject,
  )
  .option(
    '--replace-attr-values [old=new]',
    'replace an attribute value',
    argsToObject,
  )
  .option('--template <file>', 'specify a custom template to use')
  .option('--title-prop', 'create a title element linked with props')
  .option('--no-prettier', 'disable Prettier')
  .option('--no-svgo', 'disable SVGO')

program.on('--help', () => {
  console.log(`
  Examples:
    svgr --replace-attr-values "#fff=currentColor" icon.svg
`)
})

program.parse(process.argv)

async function run() {
  const errors = []
  let filenames = program.args.reduce((globbed, input) => {
    let files = glob.sync(input)
    if (!files.length) files = [input]
    return globbed.concat(files)
  }, [])

  filenames = uniq(filenames)

  await Promise.all(
    filenames.map(async filename => {
      if (await !fs.exists(filename)) {
        errors.push(`${filename} does not exist`)
      }
    }),
  )

  if (errors.length) {
    console.error(errors.join('. '))
    process.exit(2)
  }

  const config = { ...program }

  if (config.template) {
    try {
      const template = require(path.join(process.cwd(), program.template)) // eslint-disable-line global-require, import/no-dynamic-require
      if (template.default) config.template = template.default
      else config.template = template

      if (typeof config.template !== 'function')
        throw new Error('Template must be a function')
    } catch (error) {
      console.error(`Error when loading template: ${program.template}\n`)
      console.error(error.stack)
      process.exit(2)
    }
  }

  const command = program.outDir ? dirCommand : fileCommand
  await command(program, filenames, config)
}

run().catch(error => {
  setTimeout(() => {
    throw error
  })
})
