import cosmiconfig from 'cosmiconfig'
import jsx from 'h2x-plugin-jsx'
import wrapIntoComponent from './transforms/wrapIntoComponent'
import wrapIntoNativeComponent from './transforms/wrapIntoNativeComponent'
import stripAttribute from './h2x/stripAttribute'
import emSize from './h2x/emSize'
import removeDimensions from './h2x/removeDimensions'
import expandProps from './h2x/expandProps'
import svgRef from './h2x/svgRef'
import replaceAttrValue from './h2x/replaceAttrValue'
import removeComments from './h2x/removeComments'
import removeStyle from './h2x/removeStyle'
import titleProp from './h2x/titleProp'
import toReactNative from './h2x/toReactNative'
import svgAttribute from './h2x/svgAttribute'

const defaultConfig = {
  bracketSpacing: undefined, // default to prettier
  dimensions: true,
  expandProps: true,
  ext: 'js',
  icon: false,
  ids: false,
  jsxBracketSameLine: undefined, // default to prettier
  keepUselessDefs: false,
  native: false,
  precision: 3, // default to svgo
  prettier: true,
  ref: false,
  replaceAttrValues: [],
  semi: undefined, // default to prettier
  svgAttribute: null,
  singleQuote: undefined, // default to prettier
  svgo: true,
  tabWidth: undefined, // default to prettier
  template: wrapIntoComponent,
  titleProp: false,
  title: true,
  trailingComma: undefined, // default to prettier
  useTabs: undefined, // default to prettier
  viewBox: true,
}

function getH2xConfig(config) {
  const plugins = [jsx, stripAttribute('xmlns'), removeComments, removeStyle]
  config.replaceAttrValues.forEach(([oldValue, newValue]) => {
    plugins.push(replaceAttrValue(oldValue, newValue))
  })
  if (!config.dimensions) plugins.push(removeDimensions)
  if (config.icon) plugins.push(emSize)
  if (config.ref) plugins.push(svgRef)
  if (config.svgAttribute) plugins.push(svgAttribute(config.svgAttribute))
  if (config.expandProps) plugins.push(expandProps)
  if (config.native) plugins.push(toReactNative)
  if (config.titleProp) plugins.push(titleProp)

  return { plugins }
}

function getSvgoConfig(config) {
  const plugins = []
  const svgoConfig = { plugins }
  if (!config.title || config.icon) plugins.push({ removeTitle: true })
  else if (config.title) plugins.push({ removeTitle: false })
  if (config.viewBox) plugins.push({ removeViewBox: false })
  if (config.keepUselessDefs) plugins.push({ removeUselessDefs: false })
  if (config.ids) plugins.push({ cleanupIDs: { remove: false, minify: false } })
  if (config.precision === 'number')
    svgoConfig.floatPrecision = Number(svgoConfig.precision)
  return svgoConfig
}

function getPrettierConfig(config) {
  return {
    semi: config.semi,
    singleQuote: config.singleQuote,
    tabWidth: config.tabWidth,
    useTabs: config.useTabs,
    trailingComma: config.trailingComma,
    bracketSpacing: config.bracketSpacing,
    jsxBracketSameLine: config.jsxBracketSameLine,
  }
}

export function configToOptions(config = {}) {
  if (!config.template && config.native)
    config.template = wrapIntoNativeComponent
  config = { ...defaultConfig, ...config }

  return {
    svgo: config.svgo ? getSvgoConfig(config) : null,
    h2x: getH2xConfig(config),
    prettier: config.prettier ? getPrettierConfig(config) : null,
    template: config.template(config),
    ext: config.ext,
  }
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
