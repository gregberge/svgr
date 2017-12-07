const componentsToList = components =>
  [...components].filter(component => component !== 'Svg').join(', ')

const logUnsupportedComponents = components => {
  if (!components.size) return ''
  return `
// SVGR has dropped some elements not supported by react-native-svg: ${componentsToList(
    components,
  )}
`
}

export default (opts = {}) => (code, state) => {
  const {
    reactNativeSvgReplacedComponents = new Set(),
    unsupportedComponents = new Set(),
  } = state

  return `import React from 'react'
  import Svg, { ${componentsToList(
    reactNativeSvgReplacedComponents,
  )} } from 'react-native-svg';
  ${logUnsupportedComponents(unsupportedComponents)}


  const ${state.componentName} = (${opts.expandProps ? 'props' : ''}) => ${code}

  export default ${state.componentName}`
}
