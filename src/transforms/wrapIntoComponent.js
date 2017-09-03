export default (opts = {}) => (code, state) => `import React from 'react'

const ${state.componentName} = (${opts.expandProps ? 'props' : ''}) => ${code}

export default ${state.componentName}`
