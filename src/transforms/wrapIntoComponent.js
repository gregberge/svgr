import path from 'path'

const wrapIntoComponent = (opts = {}) => (code, state) => {
  const componentName = firstUpperCase(
    hyphenToCamelCase(path.parse(state.filePath).name),
  )
  return `import React from 'react'

const ${componentName} = (${opts.expandProps ? 'props' : ''}) => ${code}

export default ${componentName}`
}

const firstUpperCase = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
const hyphenToCamelCase = str =>
  str.replace(/-(.)/g, (match, chr) => chr.toUpperCase())

export default wrapIntoComponent
