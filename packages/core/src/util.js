import path from 'path'
import { upperFirst, camelCase } from 'lodash'

export const pascalCase = str => upperFirst(camelCase(str))

export function getComponentName(state) {
  if (!state.filePath) return 'SvgComponent'
  const componentName = pascalCase(path.parse(state.filePath).name)
  if (Number.isNaN(parseInt(componentName[0], 10))) return componentName
  return `Svg${componentName}`
}

export function expandState(state) {
  return {
    componentName: state.componentName || getComponentName(state),
    ...state,
  }
}
