/* eslint-disable no-console */
import fs from 'fs'
import chalk from 'chalk'
import util from 'util'
import svgrConvert from '@svgr/core'
import svgo from '@svgr/plugin-svgo'
import jsx from '@svgr/plugin-jsx'
import prettier from '@svgr/plugin-prettier'

export const readFile = util.promisify(fs.readFile)
export const stat = util.promisify(fs.stat)

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
  const code = await readFile(filePath, 'utf-8')
  return convert(code, config, { filePath })
}

export function exitError(error) {
  console.error(chalk.red(error))
  process.exit(1)
}
