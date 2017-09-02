/* eslint-disable no-console */
import program from 'commander'
import fs from 'fs'
import glob from 'glob'
import uniq from 'lodash/uniq'
import pkg from '../../package.json'
import fileCommand from './fileCommand'
import dirCommand from './dirCommand'
import getOpts from './getOpts'

program.replaceAttrValues = []

const values = val => {
  program.replaceAttrValues = [...program.replaceAttrValues, val.split('=')]
}

program
  .version(pkg.version)
  .usage('[options] <file>')
  .option('-d, --out-dir <dirname>', 'output files into a directory')
  .option('--no-svgo', 'disable SVGO')
  .option('--no-prettier', 'disable Prettier')
  .option('--no-expand-props', 'disable props expanding')
  .option('--icon', 'use "1em" as width and height')
  .option(
    '--replace-attr-value [old=new]',
    'replace an attribute value',
    values,
  )
  .option(
    '-p, --precision <value>',
    'set the number of digits in the fractional part (svgo)',
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

async function run() {
  const errors = []
  let filenames = program.args.reduce((globbed, input) => {
    let files = glob.sync(input)
    if (!files.length) files = [input]
    return globbed.concat(files)
  }, [])

  filenames = uniq(filenames)

  filenames.forEach(filename => {
    if (!fs.existsSync(filename)) {
      errors.push(`${filename} does not exist`)
    }
  })

  if (errors.length) {
    console.error(errors.join('. '))
    process.exit(2)
  }

  const opts = getOpts(program)

  const command = program.outDir ? dirCommand : fileCommand
  await command(program, filenames, opts)
}

run().catch(error => {
  setTimeout(() => {
    throw error
  })
})
