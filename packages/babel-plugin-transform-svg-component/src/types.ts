import type { types as t } from '@babel/core'
import type { TemplateBuilder } from '@babel/template'

export interface TemplateVariables {
  componentName: string
  interfaces: t.TSInterfaceDeclaration[]
  props: (t.ObjectPattern | t.Identifier)[]
  imports: t.ImportDeclaration[]
  exports: (t.VariableDeclaration | t.ExportDeclaration | t.Statement)[]
  jsx: t.JSXElement
}

interface TemplateContext {
  options: Options
  tpl: TemplateBuilder<t.Statement | t.Statement[]>['ast']
}

export interface Template {
  (variables: TemplateVariables, context: TemplateContext):
    | t.Statement
    | t.Statement[]
}

interface State {
  componentName: string
  caller?: { previousExport?: string | null }
}

export interface JSXRuntimeImport {
  source: string
  namespace?: string
  specifiers?: string[]
}

export interface Options {
  typescript?: boolean
  titleProp?: boolean
  expandProps?: boolean | 'start' | 'end'
  ref?: boolean
  template?: Template
  state: State
  native?: boolean
  memo?: boolean
  exportType?: 'named' | 'default'
  namedExport?: string
  jsxRuntime?: 'automatic' | 'classic'
  jsxRuntimeImport?: JSXRuntimeImport
  importSource?: string
}
