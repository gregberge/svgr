import { getProps, getExport, getForwardRef } from './util'

const reactDomTemplate = (code, config, state) => {
  const props = getProps(config, state)

  let result = `import React from 'react'\n\n`
  result += `const ${state.componentName} = ${props} => ${code}\n\n`
  result += getForwardRef(config, state)
  result += getExport(config, state)

  return result
}

export default reactDomTemplate
