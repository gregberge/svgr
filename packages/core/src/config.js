import cosmiconfig from 'cosmiconfig'

export const DEFAULT_CONFIG = {
  h2xConfig: null,
  dimensions: true,
  expandProps: 'end',
  icon: false,
  native: false,
  prettier: true,
  prettierConfig: null,
  ref: false,
  replaceAttrValues: null,
  svgProps: null,
  svgo: true,
  svgoConfig: null,
  template: null,
  titleProp: false,
  runtimeConfig: true,
  plugins: null,
}

const explorer = cosmiconfig('svgr', {
  sync: true,
  cache: true,
  rcExtensions: true,
})

export async function resolveConfig(searchFrom, configFile) {
  if (configFile == null) {
    const result = await explorer.search(searchFrom)
    return result ? result.config : null
  }
  const result = await explorer.load(configFile)
  return result ? result.config : null
}

resolveConfig.sync = (searchFrom, configFile) => {
  if (configFile == null) {
    const result = explorer.searchSync(searchFrom)
    return result ? result.config : null
  }
  const result = explorer.loadSync(configFile)
  return result ? result.config : null
}

export async function resolveConfigFile(filePath) {
  const result = await explorer.search(filePath)
  return result ? result.filepath : null
}

resolveConfigFile.sync = filePath => {
  const result = explorer.searchSync(filePath)
  return result ? result.filepath : null
}

export async function loadConfig({ configFile, ...baseConfig }, state = {}) {
  const rcConfig =
    state.filePath && baseConfig.runtimeConfig !== false
      ? await resolveConfig(state.filePath, configFile)
      : {}
  return { ...DEFAULT_CONFIG, ...rcConfig, ...baseConfig }
}

loadConfig.sync = ({ configFile, ...baseConfig }, state = {}) => {
  const rcConfig =
    state.filePath && baseConfig.runtimeConfig !== false
      ? resolveConfig.sync(state.filePath, configFile)
      : {}
  return { ...DEFAULT_CONFIG, ...rcConfig, ...baseConfig }
}
