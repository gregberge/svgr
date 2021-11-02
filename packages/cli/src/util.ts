/* eslint-disable no-console */
import { promises as fs } from 'fs'
import { red } from 'chalk'
import { transform, Config, State } from '@svgr/core'
import svgo from '@svgr/plugin-svgo'
import jsx from '@svgr/plugin-jsx'
import prettier from '@svgr/plugin-prettier'
// @ts-ignore
import camelCase from 'camelcase'
// @ts-ignore
import dashify from 'dashify'

export function transformFilename(
  filename: string,
  filenameCase: string,
): string {
  switch (filenameCase) {
    case 'kebab':
      return dashify(filename.replace(/_/g, '-'), { condense: true })
    case 'camel':
      return camelCase(filename)
    case 'pascal':
      return camelCase(filename, { pascalCase: true })
    default:
      throw new Error(`Unknown --filename-case ${filenameCase}`)
  }
}

export const convert = (
  code: string,
  config: Config,
  state: Partial<State>,
): string => {
  return transform.sync(code, config, {
    ...state,
    caller: {
      name: '@svgr/cli',
      defaultPlugins: [svgo, jsx, prettier],
    },
  })
}

export const convertFile = async (
  filePath: string,
  config: Config = {},
): Promise<string> => {
  const code = await fs.readFile(filePath, 'utf-8')
  return convert(code, config, { filePath })
}

export const exitError = (error: string): never => {
  console.error(red(error))
  process.exit(1)
}

export const politeWrite = (data: string, silent?: boolean): void => {
  if (!silent) {
    process.stdout.write(data)
  }
}

export const formatExportName = (name: string): string => {
  if (/[-]/g.test(name) && /^\d/.test(name)) {
    return `Svg${camelCase(name, { pascalCase: true })}`
  }

  if (/^\d/.test(name)) {
    return `Svg${name}`
  }

  return camelCase(name, { pascalCase: true })
}
