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
import toReactNative from './h2x/toReactNative'

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
  singleQuote: undefined, // default to prettier
  svgo: true,
  svgoConfig: {},
  tabWidth: undefined, // default to prettier
  template: wrapIntoComponent,
  title: true,
  trailingComma: undefined, // default to prettier
  useTabs: undefined, // default to prettier
  viewBox: true,
}

function configToOptions(config = {}) {
  if (!config.template && config.native)
    config.template = wrapIntoNativeComponent
  config = { ...defaultConfig, ...config }

  function getH2xPlugins() {
    const plugins = [jsx, stripAttribute('xmlns'), removeComments, removeStyle]
    config.replaceAttrValues.forEach(([oldValue, newValue]) => {
      plugins.push(replaceAttrValue(oldValue, newValue))
    })
    if (!config.dimensions) plugins.push(removeDimensions)
    if (config.icon) plugins.push(emSize)
    if (config.ref) plugins.push(svgRef)
    if (config.expandProps) plugins.push(expandProps)
    if (config.native) plugins.push(toReactNative)

    return plugins
  }

  function getSvgoConfig() {
    const plugins = []
    const svgoConfig = Object.assign({ plugins }, config.svgoConfig)
    if (!config.title || config.icon) plugins.push({ removeTitle: true })
    else if (config.title) plugins.push({ removeTitle: false })
    if (config.viewBox) plugins.push({ removeViewBox: false })
    if (config.keepUselessDefs) plugins.push({ removeUselessDefs: false })
    if (config.ids) plugins.push({ cleanupIDs: { remove: false } })
    if (config.precision === 'number')
      svgoConfig.floatPrecision = Number(svgoConfig.precision)
    return svgoConfig
  }

  function getPrettierConfig() {
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

  return {
    svgo: config.svgo ? getSvgoConfig() : null,
    h2x: {
      plugins: getH2xPlugins(),
    },
    prettier: config.prettier ? getPrettierConfig() : null,
    template: config.template(config),
    ext: config.ext,
  }
}

export default configToOptions
