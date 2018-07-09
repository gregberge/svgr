import SVGO from 'svgo'
import cosmiconfig from 'cosmiconfig'
import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'


function concatArrays(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }

  return undefined; // default value
}

const explorer = cosmiconfig('svgo', {
  searchPlaces: [
    'package.json',
    `.svgorc`,
    `.svgorc.json`,
    `.svgorc.yaml`,
    `.svgorc.yml`,
    `svgo.config.js`,
    '.svgo.yml',
  ],
  transform: result => result && result.config,
})

function getBaseSvgoConfig(config) {
  const baseSvgoConfig = { plugins: [] }
  if (config.icon) baseSvgoConfig.plugins.push({ removeViewBox: false })
  return baseSvgoConfig
}

export default async (code, config = {}, state = {}) => {
  if (!config.svgo) return code
  const filePath = state.filePath || process.cwd()
  const svgoRcConfig = await explorer.search(filePath)
  const svgo = new SVGO(
    mergeWith(getBaseSvgoConfig(config), svgoRcConfig, config.svgoConfig, concatArrays),
  )
  const { data } = await svgo.optimize(code)
  return data
}
