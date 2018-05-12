import SVGO from 'svgo'
import cosmiconfig from 'cosmiconfig'
import merge from 'lodash/merge'

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

export default async (code, opts = {}, state = {}) => {
  const filePath = state.filePath || process.cwd()
  const config = await explorer.search(filePath)
  const svgo = new SVGO(merge({}, config, opts))
  const { data } = await svgo.optimize(code)
  return data
}
