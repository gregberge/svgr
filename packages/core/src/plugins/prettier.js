import prettier from 'prettier'
import mergeDeep from 'merge-deep'

export default async (code, config = {}, state = {}) => {
  if (!config.prettier) return code
  const filePath = state.filePath || process.cwd()
  const prettierRcConfig = await prettier.resolveConfig(filePath, {
    editorconfig: true,
  })
  return prettier.format(
    code,
    mergeDeep(
      { parser: 'babylon' },
      prettierRcConfig,
      config.prettierConfig || {},
    ),
  )
}
