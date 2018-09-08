import path from 'path'
import camelcase from 'camelcase'

export function getComponentName(state) {
  if (!state.filePath) return 'SvgComponent'
  const componentName = camelcase(path.parse(state.filePath).name, {
    pascalCase: true,
  })
  if (Number.isNaN(parseInt(componentName[0], 10))) return componentName
  return `Svg${componentName}`
}

export function expandState(state) {
  return {
    componentName: state.componentName || getComponentName(state),
    ...state,
  }
}
