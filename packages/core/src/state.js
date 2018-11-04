import path from 'path'
import camelcase from 'camelcase'

function getComponentName(state) {
  if (!state.filePath) return 'SvgComponent'
  const pascalCaseFileName = camelcase(path.parse(state.filePath).name, {
    pascalCase: true,
  })
  return `Svg${pascalCaseFileName}`
}

export function expandState(state) {
  return {
    componentName: state.componentName || getComponentName(state),
    ...state,
  }
}
