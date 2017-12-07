const componentsToImport = components =>
  [...components].filter(component => component !== 'Svg').join(', ')

export default (opts = {}) => (code, state) => {
  const { reactNativeSvgReplacedComponents = new Set() } = state

  return `import React from 'react'
  import Svg, { ${componentsToImport(
    reactNativeSvgReplacedComponents,
  )} } from 'react-native-svg';

  const ${state.componentName} = (${opts.expandProps ? 'props' : ''}) => ${code}

  export default ${state.componentName}`
}
