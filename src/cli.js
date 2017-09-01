/* eslint-disable no-console */
import jsx from 'h2x-plugin-jsx'
import program from 'commander'
import chalk from 'chalk'
import fs from 'mz/fs'
import path from 'path'
import pkg from '../package.json'
import convert, {
  emSize,
  expandProps,
  replaceAttrValue,
  stripAttribute,
  wrapIntoComponent,
  removeComments,
} from './'

function exitError(error) {
  console.error(chalk.red(error))
  process.exit(1)
}

let replaceAttrValues = []

const values = val => {
  replaceAttrValues = [...replaceAttrValues, val.split('=')]
}

program
  .version(pkg.version)
  .usage('[options] <file>')
  .option('-w, --write', 'create a JS file')
  .option('--no-svgo', 'disable SVGO')
  .option('--no-prettier', 'disable Prettier')
  .option('--no-expand-props', 'disable props expanding')
  .option('--icon', 'use "1em" as width and height')
  .option(
    '--replace-attr-value [old=new]',
    'replace an attribute value',
    values,
  )
  .option('--no-title', 'remove title tag (svgo)')
  .option(
    '--tab-width',
    'specify the number of spaces by indentation-level (prettier)',
  )
  .option('--use-tabs', 'indent lines with tabs instead of spaces (prettier)')
  .option('--no-semi', 'remove semi-colons (prettier)')
  .option(
    '--single-quote',
    'use single-quotes instead of double-quotes (prettier)',
  )
  .option(
    '--trailing-comma <none|es5|all>',
    'print trailing commas wherever possible when multi-line (prettier)',
  )
  .option(
    '--no-bracket-spacing',
    'print spaces between brackets in object literals (prettier)',
  )
  .option(
    '--jsx-bracket-same-line	',
    'put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (prettier)',
  )

program.on('--help', () => {
  console.log(`
  Examples:
    svgr --replace-attr-value "#fff=currentColor" icon.svg
`)
})

program.parse(process.argv)

if (program.args.length === 0) {
  program.outputHelp()
  process.exit(0)
}

function getH2xPlugins() {
  const plugins = [jsx, stripAttribute('xmlns'), removeComments]
  if (program.icon) plugins.push(emSize)
  replaceAttrValues.forEach(([oldValue, newValue]) => {
    plugins.push(replaceAttrValue(oldValue, newValue))
  })
  if (program.expandProps) plugins.push(expandProps)

  return plugins
}

function getSvgoConfig() {
  const plugins = []
  if (!program.title) plugins.push({ removeTitle: {} })
  return { plugins }
}

function getPrettierConfig() {
  return {
    semi: program.semi,
    singleQuote: program.singleQuote,
    tabWidth: program.tabWidth,
    useTabs: program.useTabs,
    trailingComma: program.trailingComma,
    bracketSpacing: program.bracketSpacing,
    jsxBracketSameLine: program.jsxBracketSameLine,
  }
}

function getConfig() {
  return {
    svgo: program.svgo ? getSvgoConfig() : null,
    h2x: {
      plugins: getH2xPlugins(),
    },
    prettier: program.prettier ? getPrettierConfig() : null,
    template: wrapIntoComponent({ expandProps: program.expandProps }),
  }
}

async function run() {
  const file = program.args[0]

  if (!file) {
    exitError('You have to specify a file to convert.')
  }

  const filePath = path.join(process.cwd(), file)

  if (!await fs.exists(filePath)) {
    exitError('File not found.')
  }

  const svgCode = await fs.readFile(filePath, 'utf-8')
  const jsCode = await convert(svgCode, getConfig(), { filePath })

  if (program.output) {
    await fs.writeFile(program.output, jsCode)
    return
  }

  console.log(jsCode)
}

run().catch(error => {
  setTimeout(() => {
    throw error
  })
})
