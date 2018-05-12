import prettier from 'prettier'
import merge from 'lodash/merge'

export default async (code, opts = {}, state = {}) => {
  const filePath = state.filePath || process.cwd()
  const config = await prettier.resolveConfig(filePath)
  return prettier.format(code, merge({}, config, opts))
}
