export default (opts = {}) => {
  let props = ''

  if (opts.expandProps && opts.ref) {
    props = '{svgRef, ...props}'
  } else if (opts.expandProps) {
    props = 'props'
  } else if (opts.ref) {
    props = '{svgRef}'
  }

  return (code, state) => `import React from 'react'

const ${state.componentName} = (${props}) => ${code}

export default ${state.componentName}`
}
