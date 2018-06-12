export const getProps = config => {
  const props = []
  if (config.ref) props.push('svgRef')
  if (config.titleProp) props.push('title')
  if (config.expandProps) props.push('...props')

  if (props.length === 0) return '()'
  if (props.length === 1 && config.expandProps) return 'props'

  return `({ ${props.join(', ')} })`
}
