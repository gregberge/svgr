import deepmerge from 'deepmerge'

export function getFilePath(state) {
  return state.filePath || process.cwd()
}

export function getBaseSvgoConfig(config) {
  const baseSvgoConfig = {
    plugins: [{ prefixIds: true }],
  }
  if (config.icon || config.dimensions === false) {
    baseSvgoConfig.plugins.push({ removeViewBox: false })
  }
  return baseSvgoConfig
}

export function getPlugins(config) {
  if (!config || !config.plugins) {
    return []
  }
  if (!Array.isArray(config.plugins)) {
    throw Error('`svgoConfig.plugins` must be an array')
  }
  return config.plugins
}

function extractPlugins(config) {
  if (!config) return []
  if (!config.plugins) return []
  if (!Array.isArray(config.plugins)) return [config.plugins]
  return config.plugins
}

function mergePlugins(configs) {
  const plugins = configs.reduce(
    (merged, config) => deepmerge.all([merged, ...extractPlugins(config)]),
    {},
  )
  return Object.keys(plugins).reduce((array, key) => {
    array.push({ [key]: plugins[key] })
    return array
  }, [])
}

export function mergeSvgoConfig(...configs) {
  const plugins = mergePlugins(configs)
  return { ...deepmerge.all(configs.filter(Boolean)), plugins }
}
