import { getProps } from './util'

const reactDomTemplate = (code, config, state) => {
  const props = getProps(config)

  let result = `import React from 'react'\n\n`
  result += `const ${state.componentName} = ${props} => ${code}\n\n`

  if (state.webpack && state.webpack.previousExport) {
    result += `export default ${state.webpack.previousExport}\n`
    result += `export { ${state.componentName} as ReactComponent }`
  } else if (state.rollup && state.rollup.previousExport) {
    result += `${state.rollup.previousExport}\n`
    result += `export { ${state.componentName} as ReactComponent }`
  } else {
    result += `export default ${state.componentName}`
  }

  return result
}

export default reactDomTemplate
