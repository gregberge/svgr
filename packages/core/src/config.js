import cosmiconfig from 'cosmiconfig'

export const DEFAULT_CONFIG = {
  h2xConfig: null,
  dimensions: true,
  expandProps: true,
  icon: false,
  native: false,
  prettier: true,
  prettierConfig: null,
  ref: false,
  replaceAttrValues: null,
  svgAttributes: null,
  svgProps: null,
  svgo: true,
  svgoConfig: null,
  template: null,
  titleProp: false,
}

const explorer = cosmiconfig('svgr', {
  sync: true,
  cache: true,
  rcExtensions: true,
})

export async function resolveConfig(filePath) {
  const result = await explorer.search(filePath)
  return result ? result.config : null
}

export async function resolveConfigFile(filePath) {
  const result = await explorer.search(filePath)
  return result ? result.filepath : null
}
