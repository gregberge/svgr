import { cosmiconfigSync } from 'cosmiconfig'

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

function getSvgoConfigFromSvgrConfig(config) {
  const preset =
    config.icon || config.dimensions === false
      ? {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        }
      : 'preset-default'
  return {
    plugins: [preset, 'prefixIds'],
  }
}

export function getSvgoConfig(config, state) {
  const cwd = state.filePath || process.cwd()
  if (config.svgoConfig) return config.svgoConfig
  if (config.runtimeConfig) {
    const userConfig = explorer.search(cwd)
    if (userConfig) return userConfig
  }
  return getSvgoConfigFromSvgrConfig(config)
}
