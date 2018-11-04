import prettier from 'prettier'
import mergeDeep from 'merge-deep'

export default function prettierPlugin(code, config, state) {
  if (!config.prettier) return code
  const filePath = state.filePath || process.cwd()
  const prettierRcConfig = config.runtimeConfig
    ? prettier.resolveConfig.sync(filePath, { editorconfig: true })
    : {}
  return prettier.format(
    code,
    mergeDeep(
      { parser: 'babylon' },
      prettierRcConfig,
      config.prettierConfig || {},
    ),
  )
}
