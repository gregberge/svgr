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

export {
  stripAttribute,
  emSize,
  expandProps,
  replaceAttrValue,
  wrapIntoComponent,
  removeComments,
}

const defaultOptions = {
  svgo: {},
  h2x: {
    plugins: [
      jsx,
      removeComments,
      emSize,
      stripAttribute('xmlns'),
      expandProps,
    ],
  },
  template: wrapIntoComponent({ expandProps: true }),
  prettier: {},
}

async function convert(code, options, state) {
  let result = code
  const finalOptions = { ...defaultOptions, ...options }
  result = finalOptions.svgo
    ? await svgo(result, finalOptions.svgo, state)
    : result
  result = await h2x(result, finalOptions.h2x, state)
  result = await transform(result, { transform: finalOptions.template }, state)
  result = finalOptions.prettier
    ? await prettier(result, finalOptions.prettier, state)
    : result
  return result
}

export default convert
