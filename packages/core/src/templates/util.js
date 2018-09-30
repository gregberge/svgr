export const getProps = config => {
  const props = []
  if (config.ref) props.push('svgRef')
  if (config.titleProp) props.push('title')
  if (config.expandProps) props.push('...props')

  if (props.length === 0) return '()'
  if (props.length === 1 && config.expandProps) return 'props'

  return `({ ${props.join(', ')} })`
}

export const getExport = (config, state) => {
  const component = config.ref ? 'ForwardRef' : state.componentName
  if (state.webpack && state.webpack.previousExport) {
    let result = ''
    result += `export default ${state.webpack.previousExport}\n`
    result += `export { ${component} as ReactComponent }`
    return result
  }
  if (state.rollup && state.rollup.previousExport) {
    let result = ''
    result += `${state.rollup.previousExport}\n`
    result += `export { ${component} as ReactComponent }`
    return result
  }
  return `export default ${component}`
}

export const getForwardRef = (config, state) => {
  if (!config.ref) return ''
  return `const ForwardRef = React.forwardRef((props, ref) => <${
    state.componentName
  } svgRef={ref} {...props} />)\n\n`
}
