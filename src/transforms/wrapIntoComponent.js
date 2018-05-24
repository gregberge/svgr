export default (opts = {}) => {
  let props = ''

  if (opts.expandProps && opts.ref && opts.titleProp) {
    props = '{svgRef, title, ...props}'
  } else if (opts.expandProps && opts.titleProp) {
    props = '{title, ...props}'
  } else if (opts.expandProps && opts.ref) {
    props = '{svgRef, ...props}'
  } else if (opts.titleProp && opts.ref) {
    props = '{svgRef, title}'
  } else if (opts.expandProps) {
    props = 'props'
  } else if (opts.ref) {
    props = '{svgRef}'
  } else if (opts.titleProp) {
    props = '{title}'
  }

  return (code, state) => {
    let result = `import React from 'react'\n\n`
    result += `const ${state.componentName} = (${props}) => ${code}\n\n`

    if (state.webpack && state.webpack.previousExport) {
      result += `export default ${state.webpack.previousExport}\n`
      result += `export { ${state.componentName} as ReactComponent }`
    } else {
      result += `export default ${state.componentName}`
    }

    return result
  }
}
