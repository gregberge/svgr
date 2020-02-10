/* eslint-disable no-underscore-dangle */
import SVGO from 'svgo'
import { cosmiconfigSync } from 'cosmiconfig'
import mergeDeep from 'merge-deep'

const explorer = cosmiconfigSync('svgo', {
  searchPlaces: [
    'package.json',
    '.svgorc',
    '.svgorc.json',
    '.svgorc.yaml',
    '.svgorc.yml',
    'svgo.config.js',
    '.svgo.yml',
  ],
  transform: result => result && result.config,
  cache: true,
})

function encodeSVGDatauri(str, type) {
  let prefix = 'data:image/svg+xml'

  // base64
  if (!type || type === 'base64') {
    prefix += ';base64,'

    if (Buffer.from) {
      str = prefix + Buffer.from(str).toString('base64')
    } else {
      // eslint-disable-next-line
      str = prefix + new Buffer(str).toString('base64')
    }

    // URI encoded
  } else if (type === 'enc') {
    str = `${prefix},${encodeURIComponent(str)}`

    // unencoded
  } else if (type === 'unenc') {
    str = `${prefix},${str}`
  }

  return str
}

// See https://github.com/svg/svgo/blob/master/lib/svgo.js#L24
// _optimizeOnce is synchronous internally
function optimizeSync(svgstr, info) {
  const { config } = this

  if (config.error) {
    throw config.error
  }

  const maxPassCount = config.multipass ? 10 : 1
  let counter = 0
  let prevResultSize = Number.POSITIVE_INFINITY

  let result

  const optimizeOnceCallback = svgjs => {
    if (svgjs.error) {
      throw svgjs.error
    }

    // eslint-disable-next-line no-plusplus
    if (++counter < maxPassCount && svgjs.data.length < prevResultSize) {
      prevResultSize = svgjs.data.length
      this._optimizeOnce(svgjs.data, info, optimizeOnceCallback)
    } else {
      if (config.datauri) {
        svgjs.data = encodeSVGDatauri(svgjs.data, config.datauri)
      }
      if (info.path) {
        svgjs.path = info.path
      }

      result = svgjs
    }
  }

  this._optimizeOnce(svgstr, info, optimizeOnceCallback)
  return result
}

function getBaseSvgoConfig(config) {
  const baseSvgoConfig = {
    plugins: [{ prefixIds: true }],
  }
  if (config.icon || config.dimensions === false)
    baseSvgoConfig.plugins.push({ removeViewBox: false })
  return baseSvgoConfig
}

function getFilePath(state) {
  return state.filePath || process.cwd()
}

function getPlugins(config) {
  if (!config || !config.plugins) {
    return []
  }
  if (!Array.isArray(config.plugins)) {
    throw Error("`svgoConfig.plugins` must be an array")
  }
  return config.plugins
}

function extendPlugins(...configs) {
  const init = [];
  let i = configs.length;

  while (i-- > 0) {
    const plugins = configs[i];
    for (let j = 0; j < plugins.length; j++) {
      const plugin = plugins[j];
      if (!init.some(item => Object.keys(item)[0] === Object.keys(plugin)[0])) {
        init.push(plugin);
      }
    }
  }
  return init;
}

function createSvgo(config, rcConfig) {
  const baseSvgoConfig = getBaseSvgoConfig(config);
  const plugins = extendPlugins(getPlugins(baseSvgoConfig), getPlugins(rcConfig), getPlugins(config.svgoConfig));
  const mergedConfig = mergeDeep(
    baseSvgoConfig,
    rcConfig,
    config.svgoConfig,
  )
  mergedConfig.plugins = plugins
  return new SVGO(mergedConfig)
}

function getInfo(state) {
  return state.filePath
    ? { input: 'file', path: state.filePath }
    : { input: 'string' }
}

export default function svgoPlugin(code, config, state) {
  if (!config.svgo) return code
  const filePath = getFilePath(state)
  const svgoRcConfig = config.runtimeConfig ? explorer.search(filePath) : {}
  const svgo = createSvgo(config, svgoRcConfig)
  const { data } = optimizeSync.call(svgo, code, getInfo(state))
  return data
}
