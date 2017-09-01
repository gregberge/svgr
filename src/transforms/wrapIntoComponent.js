import path from 'path'

const wrapIntoComponent = (opts = {}) => (code, state) => {
  const componentName = firstUpperCase(path.parse(state.filePath).name)
  return `import React from 'react'

const ${componentName} = (${opts.expandProps ? 'props' : ''}) => ${code}

export default ${componentName}`
}

const firstUpperCase = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export default wrapIntoComponent
