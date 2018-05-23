import jsx from 'h2x-plugin-jsx'
import path from 'path'
import svgo from './plugins/svgo'
import h2x from './plugins/h2x'
import prettier from './plugins/prettier'
import transform from './plugins/transform'
import wrapIntoComponent from './transforms/wrapIntoComponent'
import { pascalCase } from './transforms/rename'
import stripAttribute from './h2x/stripAttribute'
import emSize from './h2x/emSize'
import expandProps from './h2x/expandProps'
import svgRef from './h2x/svgRef'
import replaceAttrValue from './h2x/replaceAttrValue'
import removeComments from './h2x/removeComments'
import removeStyle from './h2x/removeStyle'
import { configToOptions } from './config'

export {
  jsx,
  stripAttribute,
  emSize,
  expandProps,
  replaceAttrValue,
  svgRef,
  wrapIntoComponent,
  removeComments,
  removeStyle,
}

function getComponentName(state) {
  const componentName = pascalCase(path.parse(state.filePath).name)
  if (Number.isNaN(parseInt(componentName[0], 10))) {
    return componentName
  }

  return `Svg${componentName}`
}

function expandState(state) {
  return { componentName: getComponentName(state), ...state }
}

export async function rawConvert(code, options, state) {
  state = expandState(state)
  let result = code
  result = options.svgo ? await svgo(result, options.svgo, state) : result
  result = await h2x(result, options.h2x, state)
  result = await transform(result, { transform: options.template }, state)
  result = options.prettier
    ? await prettier(result, options.prettier, state)
    : result
  return result
}

export default async function convert(
  code,
  { componentName = 'SvgComponent', ...config } = {},
  initialState = {},
) {
  const options = configToOptions(config)
  const state = {
    ...initialState,
    filePath: componentName,
  }
  return rawConvert(code, options, state)
}
