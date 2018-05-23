/* eslint-disable no-console */
import chalk from 'chalk'
import { extname } from 'path'
import fs from 'mz/fs'
import readdir from 'recursive-readdir'
import { rawConvert } from '../'
import { configToOptions, resolveConfig } from '../config'

function mergeConfigs(cliConfig, rcConfig) {
  return Object.keys(cliConfig).reduce(
    (config, key) => {
      const value = cliConfig[key]
      if (!Array.isArray(value) || value.length > 0) {
        config[key] = value
      }
      return config
    },
    { ...rcConfig },
  )
}

export async function convertFile(filePath, config) {
  const code = await fs.readFile(filePath, 'utf-8')
  const rcConfig = await resolveConfig(config.config || filePath)
  const options = configToOptions(mergeConfigs(config, rcConfig))
  return rawConvert(code, options, { filePath })
}

export function exitError(error) {
  console.error(chalk.red(error))
  process.exit(1)
}

export { readdir }

export async function readdirFilter(dirname) {
  return (await readdir(dirname)).filter(isCompilableExtension)
}

const COMPILABLE_EXTENSIONS = ['.svg', '.SVG']

export function isCompilableExtension(filename) {
  const ext = extname(filename)
  return COMPILABLE_EXTENSIONS.includes(ext)
}
