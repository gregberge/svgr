/* eslint-disable no-console */
import fs from 'fs'
import chalk from 'chalk'
import util from 'util'
import convert, { resolveConfig } from '@svgr/core'

export const readFile = util.promisify(fs.readFile)
export const stat = util.promisify(fs.stat)

export async function convertFile(filePath, { config, ...options } = {}) {
  const code = await readFile(filePath, 'utf-8')
  const rcConfig = await resolveConfig(filePath, config)
  return convert(code, { ...rcConfig, ...options }, { filePath })
}

export function exitError(error) {
  console.error(chalk.red(error))
  process.exit(1)
}
