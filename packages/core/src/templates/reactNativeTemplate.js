import { getProps, getForwardRef, getExportName } from './util'

const getComponents = components => {
  if (!components.size) return ''
  const componentsStr = [...components]
    .filter(component => component !== 'Svg')
    .join(', ')
  return `, { ${componentsStr} }`
}

const getWarning = components => {
  if (!components.size) return ''
  const componentList = [...components].join(', ')
  return `
// SVGR has dropped some elements not supported by react-native-svg: ${componentList}
`
}

const reactNativeTemplate = (code, config, state) => {
  const {
    reactNativeSvgReplacedComponents = new Set(),
    unsupportedComponents = new Set(),
  } = state

  const props = getProps(config)
  const components = getComponents(reactNativeSvgReplacedComponents)
  const warnLog = getWarning(unsupportedComponents)

  let result = `import React from 'react'\n`
  result += `import Svg${components} from 'react-native-svg';\n`
  result += warnLog
  result += `const ${state.componentName} = ${props} => ${code}\n\n`
  result += getForwardRef(config, state)
  result += `export default ${getExportName(config, state)}`

  return result
}

export default reactNativeTemplate
