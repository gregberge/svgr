import SVGO from 'svgo'
import cosmiconfig from 'cosmiconfig'
import mergeDeep from 'merge-deep'

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
    mergeDeep(getBaseSvgoConfig(config), svgoRcConfig, config.svgoConfig),
  )
  const info = state.filePath
    ? { input: 'file', path: state.filePath }
    : { input: 'string' }
  const { data } = await svgo.optimize(code, info)
  return data
}
