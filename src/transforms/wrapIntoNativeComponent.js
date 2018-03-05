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

  let props = ''

  if (opts.expandProps && opts.ref) {
    props = '{svgRef, ...props}'
  } else if (opts.expandProps) {
    props = 'props'
  } else if (opts.ref) {
    props = '{svgRef}'
  }

  return `import React from 'react'
  import Svg, { ${componentsToList(
    reactNativeSvgReplacedComponents,
  )} } from 'react-native-svg';
  ${logUnsupportedComponents(unsupportedComponents)}


  const ${state.componentName} = (${props}) => ${code}

  export default ${state.componentName}`
}
