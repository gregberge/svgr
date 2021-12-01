import { cosmiconfigSync } from 'cosmiconfig'
import type { Config, State } from '@svgr/core'

const explorer = cosmiconfigSync('svgo', {
  searchPlaces: [
    'package.json',
    '.svgorc',
    '.svgorc.js',
    '.svgorc.json',
    '.svgorc.yaml',
    '.svgorc.yml',
    'svgo.config.js',
    '.svgo.yml',
  ],
  transform: (result) => result && result.config,
  cache: true,
})

const getSvgoConfigFromSvgrConfig = (config: Config): any => {
  const params = { overrides: {} as any }
  if (config.icon || config.dimensions === false) {
    params.overrides.removeViewBox = false
  }
  if (config.native) {
    params.overrides.inlineStyles = {
      onlyMatchedOnce: false,
    }
  }

  return {
    plugins: [
      {
        name: 'preset-default',
        params,
      },
      'prefixIds',
    ],
  }
}

export const getSvgoConfig = (config: Config, state: State): any => {
  const cwd = state.filePath || process.cwd()
  if (config.svgoConfig) return config.svgoConfig
  if (config.runtimeConfig) {
    const userConfig = explorer.search(cwd)
    if (userConfig) return userConfig
  }
  return getSvgoConfigFromSvgrConfig(config)
}
