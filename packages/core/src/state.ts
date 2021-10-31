import { parse as parsePath } from 'path'
// @ts-ignore
import camelCase from 'camelcase'
import type { ConfigPlugin } from './plugins'

export interface State {
  filePath?: string
  componentName: string
  caller?: {
    name?: string
    previousExport?: string | null
    defaultPlugins?: ConfigPlugin[]
  }
}

const VALID_CHAR_REGEX = /[^a-zA-Z0-9_-]/g

const getComponentName = (filePath?: string): string => {
  if (!filePath) return 'SvgComponent'
  const pascalCaseFileName = camelCase(
    parsePath(filePath).name.replace(VALID_CHAR_REGEX, ''),
    {
      pascalCase: true,
    },
  )
  return `Svg${pascalCaseFileName}`
}

export const expandState = (state: Partial<State>): State => {
  return {
    componentName: state.componentName || getComponentName(state.filePath),
    ...state,
  }
}
