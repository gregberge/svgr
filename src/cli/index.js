/* eslint-disable no-console */
import program from 'commander'
import path from 'path'
import fs from 'mz/fs'
import glob from 'glob'
import uniq from 'lodash/uniq'
import pkg from '../../package.json'
import fileCommand from './fileCommand'
import dirCommand from './dirCommand'

program.replaceAttrValues = []

const values = val => {
  program.replaceAttrValues = [...program.replaceAttrValues, val.split('=')]
}

const parseArgsToObj = (arg, accumulation = {}) => {
  const [name, value] = arg.split('=')
  return { ...accumulation, [name]: value }
}

program
  .version(pkg.version)
  .usage('[options] <file>')
  .option('--config <file>', 'specify the path of the svgr config')
  .option('--ext <ext>', 'specify a custom file extension (default: "js")')
  .option('--icon', 'use "1em" as width and height')
  .option('--ids', 'keep ids within the svg (svgo)')
  .option(
    '--jsx-bracket-same-line',
    'put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (prettier)',
  )
  .option('--keep-useless-defs', 'keep elements of <defs> without id (svgo)')
  .option('--native', 'add react-native support with react-native-svg')
  .option(
    '--no-bracket-spacing',
    'print spaces between brackets in object literals (prettier)',
  )
  .option('--no-dimensions', 'remove width and height from root SVG tag')
  .option('--no-expand-props', 'disable props expanding')
  .option('--no-prettier', 'disable Prettier')
  .option('--no-semi', 'remove semi-colons (prettier)')
  .option('--no-svgo', 'disable SVGO')
  .option('--no-title', 'remove title tag (svgo)')
  .option('--no-view-box', 'remove viewBox')
  .option('-d, --out-dir <dirname>', 'output files into a directory')
  .option(
    '-p, --precision <value>',
    'set the number of digits in the fractional part (svgo)',
    parseInt,
  )
  .option('--ref', 'add svgRef prop to svg')
  .option(
    '--svg-attribute [property=value]',
    'add some attributes to the svg',
    parseArgsToObj,
  )
  .option(
    '--replace-attr-value [old=new]',
    'replace an attribute value',
    values,
  )
  .option(
    '--single-quote',
    'use single-quotes instead of double-quotes (prettier)',
  )
  .option(
    '--tab-width <value>',
    'specify the number of spaces by indentation-level (prettier)',
    parseInt,
  )
  .option('--template <file>', 'specify a custom template to use')
  .option(
    '--trailing-comma <none|es5|all>',
    'print trailing commas wherever possible when multi-line (prettier)',
  )
  .option('--use-tabs', 'indent lines with tabs instead of spaces (prettier)')
  .option('--title-prop', 'create a title element linked with props')

program.on('--help', () => {
  console.log(`
  Examples:
    svgr --replace-attr-value "#fff=currentColor" icon.svg
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
