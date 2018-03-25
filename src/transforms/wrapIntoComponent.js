export default (opts = {}) => {
  let props = ''

  if (opts.expandProps && opts.ref) {
    props = '{svgRef, ...props}'
  } else if (opts.expandProps) {
    props = 'props'
  } else if (opts.ref) {
    props = '{svgRef}'
  }

  return (code, state) => {
    // prepend 'svg' to the component const name if it starts with a number
    const name = Number.isNaN(parseInt(state.componentName[0], 10)) ? state.componentName : `svg${state.componentName}`;

    let result = `import React from 'react'\n\n`
    result += `const ${name} = (${props}) => ${code}\n\n`

    if (state.webpack && state.webpack.previousExport) {
      result += `export default ${state.webpack.previousExport}\n`
      result += `export { ${state.componentName} as ReactComponent }`
    } else {
      result += `export default ${state.componentName}`
    }

    return result
  }
}
