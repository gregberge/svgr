/* eslint-disable no-console */
import { program, Command } from 'commander'
import * as path from 'path'
import { glob } from 'glob'
import { readFileSync, promises as fsPromises } from 'fs'
import { loadConfig, Config } from '@svgr/core'
import { fileCommand } from './fileCommand'
import { dirCommand } from './dirCommand'
import { exitError } from './util'
import type { IndexTemplate } from './dirCommand'
import { version } from '../package.json'

const noUndefinedKeys = <T extends Record<string, any>>(obj: T): T => {
  return Object.entries(obj).reduce((obj, [key, value]) => {
    if (value !== undefined) {
      // @ts-ignore
      obj[key] = value
    }
    return obj
  }, {} as T)
}

const parseObject = (arg: string, accumulation = {}) => {
  const [name, value] = arg.split('=')
  return { ...accumulation, [name]: value }
}

const parseObjectList = (arg: string, accumulation = {}) => {
  const args = arg.split(',').map((str) => str.trim())
  return args.reduce((acc, arg) => parseObject(arg, acc), accumulation)
}

const parseConfig = (name: string) => (arg: string) => {
  try {
    if (arg.endsWith('rc')) {
      const content = readFileSync(arg, 'utf-8')
      return JSON.parse(content)
    }

    const ext = path.extname(arg)
    if (ext === '.js' || ext === '.json') {
      return require(path.join(process.cwd(), arg))
    }

    return JSON.parse(arg)
  } catch (error) {
    exitError(
      `"${name}" is not valid, please specify a valid file or use a inline JSON.`,
    )
  }
}

const parseExpandProps = (arg: string) => (arg === 'none' ? false : arg)

const parseTemplate = (name: string) => (arg: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const template = require(path.join(process.cwd(), arg))
    const resolved = template.default || template
    if (typeof resolved !== 'function') {
      throw new Error(`${name} file must export a function`)
    }
    return resolved
  } catch (error: any) {
    console.error(`Error when loading "${name}": ${arg}\n`)
    console.error(error.stack)
    process.exit(2)
  }
}

const parseIconSize = (arg: string) => {
  const num = Number(arg)
  return Number.isNaN(num) ? arg : num
}

export interface Options extends Config {
  configFile?: string
  runtimeConfig?: boolean
  outDir?: string
  ignoreExisting?: boolean
  ext?: string
  filenameCase?: string
  silent?: boolean
  stdin?: boolean
  stdinFilepath?: string
  indexTemplate?: IndexTemplate
}

export interface SvgrCommand {
  (opts: Options, program: Command, filenames: string[]): Promise<void>
}

program
  .version(version)
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
  .option(
    '--icon [size]',
    'specify width and height (default to "1em" or 24dp (native))',
    parseIconSize,
  )
  .option(
    '--jsx-runtime <runtime>',
    'specify JSX runtime ("automatic", "classic", "classic-preact") (default: "classic")',
  )
  .option('--typescript', 'transform svg into typescript')
  .option('--native', 'add react-native support with react-native-svg')
  .option('--memo', 'add React.memo into the result component')
  .option('--ref', 'forward ref to SVG root element')
  .option('--no-dimensions', 'remove width and height from root SVG tag')
  .option(
    '--expand-props [position]',
    'disable props expanding ("start", "end", "none") (default: "end")',
    parseExpandProps,
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
  .option(
    '--template <file>',
    'specify a custom template to use',
    parseTemplate('--template'),
  )
  .option(
    '--index-template <file>',
    'specify a custom index.js template to use',
    parseTemplate('--index-template'),
  )
  .option('--no-index', 'disable index file generation')
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
  const errors: string[] = []
  const filenames = program.args.reduce((globbed, input) => {
    let files = glob.sync(input)
    if (!files.length) files = [input]
    return [...globbed, ...files]
  }, [] as string[])

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

  const programOpts = noUndefinedKeys(program.opts<Options>())
  const opts = (await loadConfig(programOpts, {
    filePath: process.cwd(),
  })) as Options

  const command = opts.outDir ? dirCommand : fileCommand
  await command(opts, program, filenames)
}

run().catch((error) => {
  setTimeout(() => {
    throw error
  })
})
