/* eslint-disable no-console */
import program from 'commander'
import path from 'path'
import glob from 'glob'
import fs from 'fs'
import pkg from '../package.json'
import fileCommand from './fileCommand'
import dirCommand from './dirCommand'
import { stat, exitError } from './util'

function parseObject(arg, accumulation = {}) {
  const [name, value] = arg.split('=')
  return { ...accumulation, [name]: value }
}

function parseObjectList(arg, accumulation = {}) {
  const args = arg.split(',').map(str => str.trim())
  return args.reduce((acc, arg) => parseObject(arg, acc), accumulation)
}

function isFile(filePath) {
  try {
    const stats = fs.statSync(filePath)
    return stats.isFile()
  } catch (error) {
    return false
  }
}

const parseConfig = name => arg => {
  const json = isFile(arg) ? fs.readFileSync(arg) : arg
  try {
    return JSON.parse(json)
  } catch (error) {
    exitError(
      `"${name}" is not valid, please specify a file or use inline JSON.`,
    )
    return null
  }
}

program
  .version(pkg.version)
  .usage('[options] <file|directory>')
  .option('--config-file <file>', 'specify the path of the svgr config')
  .option(
    '--no-runtime-config',
    'disable runtime config (".svgrrc", ".svgo.yml", ".prettierrc")',
  )
  .option('-d, --out-dir <dirname>', 'output files into a directory')
  .option('--ignore-existing', 'ignore existing files in output directory')
  .option('--ext <ext>', 'specify a custom file extension (default: "js")')
  .option(
    '--filename-case <case>',
    'specify filename case ("pascal", "kebab", "camel") (default: "pascal")',
  )
  .option('--icon', 'use "1em" as width and height')
  .option('--native', 'add react-native support with react-native-svg')
  .option('--memo', 'add React.memo into the result component')
  .option('--ref', 'forward ref to SVG root element')
  .option('--no-dimensions', 'remove width and height from root SVG tag')
  .option(
    '--expand-props [position]',
    'disable props expanding ("start", "end", "none") (default: "end")',
  )
  .option(
    '--svg-props <property=value>',
    'add props to the svg element',
    parseObjectList,
  )
  .option(
    '--replace-attr-values <old=new>',
    'replace an attribute value',
    parseObjectList,
  )
  .option('--template <file>', 'specify a custom template to use')
  .option(
    '--index-template <file>',
    'specify a custom index.js template to use',
  )
  .option('--title-prop', 'create a title element linked with props')
  .option(
    '--prettier-config <fileOrJson>',
    'Prettier config',
    parseConfig('--prettier-config'),
  )
  .option('--no-prettier', 'disable Prettier')
  .option(
    '--svgo-config <fileOrJson>',
    'SVGO config',
    parseConfig('--svgo-config'),
  )
  .option('--no-svgo', 'disable SVGO')
  .option('--silent', 'suppress output')
  .option('--stdin', 'force reading input from stdin')
  .option(
    '--stdin-filepath',
    'path to the file to pretend that stdin comes from',
  )

program.on('--help', () => {
  console.log(`
  Examples:
    svgr --replace-attr-values "#fff=currentColor" icon.svg
`)
})

program.parse(process.argv)

async function run() {
  const errors = []
  const filenames = program.args.reduce((globbed, input) => {
    let files = glob.sync(input)
    if (!files.length) files = [input]
    return globbed.concat(files)
  }, [])

  await Promise.all(
    filenames.map(async filename => {
      try {
        await stat(filename)
      } catch (error) {
        errors.push(`${filename} does not exist`)
      }
    }),
  )

  if (errors.length) {
    console.error(errors.join('. '))
    process.exit(2)
  }

  const config = { ...program }

  if (config.expandProps === 'none') {
    config.expandProps = false
  }

  if (config.dimensions === true) {
    delete config.dimensions
  }

  if (config.svgo === true) {
    delete config.svgo
  }

  if (config.prettier === true) {
    delete config.prettier
  }

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

  if (config.indexTemplate) {
    try {
      const indexTemplate = require(path.join(
        process.cwd(),
        program.indexTemplate,
      )) // eslint-disable-line global-require, import/no-dynamic-require
      if (indexTemplate.default) config.indexTemplate = indexTemplate.default
      else config.indexTemplate = indexTemplate

      if (typeof config.indexTemplate !== 'function')
        throw new Error('indexTemplate must be a function')
    } catch (error) {
      console.error(
        `Error when loading indexTemplate: ${program.indexTemplate}\n`,
      )
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
