import jsx from 'h2x-plugin-jsx'
import svgo from './plugins/svgo'
import h2x from './plugins/h2x'
import prettier from './plugins/prettier'
import transform from './plugins/transform'
import wrapIntoComponent from './transforms/wrapIntoComponent'
import stripAttribute from './h2x/stripAttribute'
import emSize from './h2x/emSize'
import expandProps from './h2x/expandProps'
import replaceAttrValue from './h2x/replaceAttrValue'
import removeComments from './h2x/removeComments'
import configToOptions from './configToOptions'

export {
  jsx,
  stripAttribute,
  emSize,
  expandProps,
  replaceAttrValue,
  wrapIntoComponent,
  removeComments,
}

export async function rawConvert(code, options, state) {
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
) {
  return rawConvert(code, configToOptions(config), {
    filePath: componentName,
  })
}
