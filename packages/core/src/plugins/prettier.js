import prettier from 'prettier'
import merge from 'lodash/merge'

export default async (code, config = {}, state = {}) => {
  if (!config.prettier) return code
  const filePath = state.filePath || process.cwd()
  const prettierRcConfig = await prettier.resolveConfig(filePath)
  return prettier.format(
    code,
    merge({ parser: 'babylon' }, prettierRcConfig, config.prettierConfig || {}),
  )
}
