/* eslint-disable no-console */
import { promises as fs } from 'fs'
import chalk from 'chalk'
import svgrConvert from '@svgr/core'
import svgo from '@svgr/plugin-svgo'
import jsx from '@svgr/plugin-jsx'
import prettier from '@svgr/plugin-prettier'
import camelcase from 'camelcase'
import dashify from 'dashify'

export const CASE = {
  KEBAB: 'kebab', // kebab-case
  CAMEL: 'camel', // camelCase
  PASCAL: 'pascal', // PascalCase
}

export function transformFilename(filename, filenameCase) {
  switch (filenameCase) {
    case CASE.KEBAB:
      return dashify(filename.replace(/_/g, '-'), { condense: true })
    case CASE.CAMEL:
      return camelcase(filename)
    case CASE.PASCAL:
      return camelcase(filename, { pascalCase: true })
    default:
      throw new Error(`Unknown --filename-case ${filenameCase}`)
  }
}

export function convert(code, config, state) {
  return svgrConvert.sync(code, config, {
    ...state,
    caller: {
      name: '@svgr/cli',
      defaultPlugins: [svgo, jsx, prettier],
    },
  })
}

export async function convertFile(filePath, config = {}) {
  const code = await fs.readFile(filePath, 'utf-8')
  return convert(code, config, { filePath })
}

export function exitError(error) {
  console.error(chalk.red(error))
  process.exit(1)
}

export function politeWrite(program, data) {
  if (!program.silent) {
    process.stdout.write(data)
  }
}

export function formatExportName(name) {
  if (/[-]/g.test(name) && /^\d/.test(name)) {
    return `Svg${camelcase(name, { pascalCase: true })}`
  }

  if (/^\d/.test(name)) {
    return `Svg${name}`
  }

  if (/[-]/g.test(name)) {
    return camelcase(name, { pascalCase: true })
  }

  return name
}
