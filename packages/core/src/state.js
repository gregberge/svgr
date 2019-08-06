import path from 'path'
import camelcase from 'camelcase'

const validCharacters = /[^a-zA-Z0-9_-]/g

function getComponentName(state) {
  if (!state.filePath) return 'SvgComponent'
  const pascalCaseFileName = camelcase(
    path.parse(state.filePath).name.replace(validCharacters, ''),
    {
      pascalCase: true,
    },
  )
  return `Svg${pascalCaseFileName}`
}

export function expandState(state) {
  return {
    componentName: state.componentName || getComponentName(state),
    ...state,
  }
}
