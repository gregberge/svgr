/* eslint-disable no-console */
import program from 'commander'
import path from 'path'
import glob from 'glob'
import fs, { promises as fsPromises } from 'fs'
import { loadConfig } from '@svgr/core'
import pkg from '../package.json'
import fileCommand from './fileCommand'
import dirCommand from './dirCommand'
import { exitError } from './util'

function noUndefinedKeys(obj) {
  return Object.entries(obj).reduce((obj, [key, value]) => {
    if (value !== undefined) {
      obj[key] = value
    }
    return obj
  }, {})
}

function parseObject(arg, accumulation = {}) {
  const [name, value] = arg.split('=')
  return { ...accumulation, [name]: value }
}

function parseObjectList(arg, accumulation = {}) {
  const args = arg.split(',').map((str) => str.trim())
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

const parseConfig = (name) => (arg) => {
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
  .option('--ignore-existing', 'ignore existing files when used with --out-dir')
  .option('--ext <ext>', 'specify a custom file extension (default: "js")')
  .option(
    '--filename-case <case>',
    'specify filename case ("pascal", "kebab", "camel") (default: "pascal")',
  )
  .option('--icon', 'use "1em" as width and height')
  .option('--typescript', 'transform svg into typescript')
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
    filenames.map(async (filename) => {
      try {
        await fsPromises.stat(filename)
      } catch (error) {
        errors.push(`${filename} does not exist`)
      }
    }),
  )

  if (errors.length) {
    console.error(errors.join('. '))
    process.exit(2)
  }

  const opts = noUndefinedKeys(program.opts())

  const config = await loadConfig(opts, { filePath: process.cwd() })

  // Back config file
  config.configFile = opts.configFile

  if (opts.expandProps === 'none') {
    config.expandProps = false
  }

  if (opts.dimensions === true) {
    delete config.dimensions
  }

  if (opts.svgo === true) {
    delete config.svgo
  }

  if (opts.prettier === true) {
    delete config.prettier
  }

  if (opts.template) {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const template = require(path.join(process.cwd(), opts.template))
      if (template.default) config.template = template.default
      else config.template = template

      if (typeof config.template !== 'function')
        throw new Error('Template must be a function')
    } catch (error) {
      console.error(`Error when loading template: ${opts.template}\n`)
      console.error(error.stack)
      process.exit(2)
    }
  }

  if (opts.indexTemplate) {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const indexTemplate = require(path.join(
        process.cwd(),
        opts.indexTemplate,
      ))
      if (indexTemplate.default) config.indexTemplate = indexTemplate.default
      else config.indexTemplate = indexTemplate

      if (typeof config.indexTemplate !== 'function')
        throw new Error('indexTemplate must be a function')
    } catch (error) {
      console.error(`Error when loading indexTemplate: ${opts.indexTemplate}\n`)
      console.error(error.stack)
      process.exit(2)
    }
  }

  const command = opts.outDir ? dirCommand : fileCommand

  await command(opts, program, filenames, config)
}

run().catch((error) => {
  setTimeout(() => {
    throw error
  })
})
