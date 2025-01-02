import { types as t, template } from '@babel/core'
import type { Options, TemplateVariables, JSXRuntimeImport } from './types'
import type { ImportDeclaration } from '@babel/types'

const tsOptionalPropertySignature = (
  ...args: Parameters<typeof t.tsPropertySignature>
) => {
  return {
    ...t.tsPropertySignature(...args),
    optional: true,
  } as t.TSPropertySignature
}

interface Context {
  opts: Options
  interfaces: t.TSInterfaceDeclaration[]
  props: (t.Identifier | t.ObjectPattern)[]
  imports: t.ImportDeclaration[]
  importSource: string
}

const getOrCreateImport = (
  { imports }: Context,
  sourceValue: string,
  importKind: ImportDeclaration['importKind'] = undefined,
) => {
  const existing = imports.find(
    (imp) =>
      imp.source.value === sourceValue &&
      imp.importKind === importKind &&
      !imp.specifiers.some(
        (specifier) => specifier.type === 'ImportNamespaceSpecifier',
      ),
  )
  if (existing) return existing
  const imp = t.importDeclaration([], t.stringLiteral(sourceValue))
  if (importKind !== undefined) {
    imp.importKind = importKind
  }
  imports.push(imp)
  return imp
}

const tsTypeReferenceSVGProps = (ctx: Context) => {
  if (ctx.opts.native) {
    const identifier = t.identifier('SvgProps')
    getOrCreateImport(ctx, 'react-native-svg', 'type').specifiers.push(
      t.importSpecifier(identifier, identifier),
    )
    return t.tsTypeReference(identifier)
  }
  const identifier = t.identifier('SVGProps')
  getOrCreateImport(ctx, ctx.importSource, 'type').specifiers.push(
    t.importSpecifier(identifier, identifier),
  )
  return t.tsTypeReference(
    identifier,
    t.tsTypeParameterInstantiation([
      t.tsTypeReference(t.identifier('SVGSVGElement')),
    ]),
  )
}

const tsTypeReferenceSVGRef = (ctx: Context) => {
  const identifier = t.identifier('Ref')
  getOrCreateImport(ctx, ctx.importSource).specifiers.push(
    t.importSpecifier(identifier, identifier),
  )
  if (ctx.opts.native) {
    return t.tsTypeReference(
      identifier,
      t.tsTypeParameterInstantiation([t.tsTypeReference(t.identifier('Svg'))]),
    )
  }
  return t.tsTypeReference(
    identifier,
    t.tsTypeParameterInstantiation([
      t.tsTypeReference(t.identifier('SVGSVGElement')),
    ]),
  )
}

const getJsxRuntimeImport = (cfg: JSXRuntimeImport) => {
  const specifiers = (() => {
    if (cfg.namespace)
      return [t.importNamespaceSpecifier(t.identifier(cfg.namespace))]
    if (cfg.defaultSpecifier) {
      const identifier = t.identifier(cfg.defaultSpecifier)
      return [t.importDefaultSpecifier(identifier)]
    }
    if (cfg.specifiers)
      return cfg.specifiers.map((specifier) => {
        const identifier = t.identifier(specifier)
        return t.importSpecifier(identifier, identifier)
      })
    throw new Error(
      `Specify "namespace", "defaultSpecifier", or "specifiers" in "jsxRuntimeImport" option`,
    )
  })()
  return t.importDeclaration(specifiers, t.stringLiteral(cfg.source))
}

const defaultJsxRuntimeImport: JSXRuntimeImport = {
  source: 'react',
  namespace: 'React',
}

const defaultImportSource = 'react'

export const getVariables = ({
  opts,
  jsx,
}: {
  opts: Options
  jsx: t.JSXElement
}): TemplateVariables => {
  const interfaces: t.TSInterfaceDeclaration[] = []
  const props: (t.Identifier | t.ObjectPattern)[] = []
  const imports: t.ImportDeclaration[] = []
  const exports: (t.VariableDeclaration | t.ExportDeclaration | t.Statement)[] =
    []
  const ctx = {
    importSource: opts.importSource ?? defaultImportSource,
    exportIdentifier: t.identifier(opts.state.componentName),
    opts,
    interfaces,
    props,
    imports,
    exports,
  }

  if (opts.jsxRuntime !== 'automatic') {
    imports.push(
      getJsxRuntimeImport(opts.jsxRuntimeImport ?? defaultJsxRuntimeImport),
    )
  }

  if (opts.native) {
    getOrCreateImport(ctx, 'react-native-svg').specifiers.push(
      t.importDefaultSpecifier(t.identifier('Svg')),
    )
  }

  if (opts.titleProp || opts.descProp) {
    const properties = []
    const propertySignatures = []
    const createProperty = (attr: string) => {
      return t.objectProperty(
        t.identifier(attr),
        t.identifier(attr),
        false,
        true,
      )
    }
    const createSignature = (attr: string) => {
      return tsOptionalPropertySignature(
        t.identifier(attr),
        t.tsTypeAnnotation(t.tsStringKeyword()),
      )
    }

    if (opts.titleProp) {
      properties.push(createProperty('title'), createProperty('titleId'))

      if (opts.typescript) {
        propertySignatures.push(
          createSignature('title'),
          createSignature('titleId'),
        )
      }
    }

    if (opts.descProp) {
      properties.push(createProperty('desc'), createProperty('descId'))

      if (opts.typescript) {
        propertySignatures.push(
          createSignature('desc'),
          createSignature('descId'),
        )
      }
    }

    const prop = t.objectPattern(properties)
    props.push(prop)
    if (opts.typescript) {
      interfaces.push(
        t.tsInterfaceDeclaration(
          t.identifier('SVGRProps'),
          null,
          null,
          t.tSInterfaceBody(propertySignatures),
        ),
      )
      prop.typeAnnotation = t.tsTypeAnnotation(
        t.tsTypeReference(t.identifier('SVGRProps')),
      )
    }
  }

  if (opts.expandProps) {
    const identifier = t.identifier('props')
    if (t.isObjectPattern(props[0])) {
      props[0].properties.push(t.restElement(identifier))
      if (opts.typescript) {
        props[0].typeAnnotation = t.tsTypeAnnotation(
          t.tsIntersectionType([
            tsTypeReferenceSVGProps(ctx),
            (props[0].typeAnnotation as t.TSTypeAnnotation).typeAnnotation,
          ]),
        )
      }
    } else {
      props.push(identifier)
      if (opts.typescript) {
        identifier.typeAnnotation = t.tsTypeAnnotation(
          tsTypeReferenceSVGProps(ctx),
        )
      }
    }
  }

  if (opts.ref) {
    if (props.length === 0) {
      props.push(t.identifier('_'))
    }
    const prop = t.identifier('ref')
    props.push(prop)
    if (opts.typescript) {
      prop.typeAnnotation = t.tsTypeAnnotation(tsTypeReferenceSVGRef(ctx))
    }
    const forwardRef = t.identifier('forwardRef')
    const ForwardRef = t.identifier('ForwardRef')
    getOrCreateImport(ctx, ctx.importSource).specifiers.push(
      t.importSpecifier(forwardRef, forwardRef),
    )
    exports.push(
      t.variableDeclaration('const', [
        t.variableDeclarator(
          ForwardRef,
          t.callExpression(forwardRef, [ctx.exportIdentifier]),
        ),
      ]),
    )
    ctx.exportIdentifier = ForwardRef
  }

  if (opts.memo) {
    const memo = t.identifier('memo')
    const Memo = t.identifier('Memo')
    getOrCreateImport(ctx, ctx.importSource).specifiers.push(
      t.importSpecifier(memo, memo),
    )
    exports.push(
      t.variableDeclaration('const', [
        t.variableDeclarator(
          Memo,
          t.callExpression(memo, [ctx.exportIdentifier]),
        ),
      ]),
    )
    ctx.exportIdentifier = Memo
  }

  if (opts.state.caller?.previousExport || opts.exportType === 'named') {
    if (!opts.namedExport) {
      throw new Error(`"namedExport" not specified`)
    }
    exports.push(
      t.exportNamedDeclaration(null, [
        t.exportSpecifier(ctx.exportIdentifier, t.identifier(opts.namedExport)),
      ]),
    )
    if (opts.state.caller?.previousExport) {
      const previousExportAst = template.ast(opts.state.caller.previousExport)
      exports.push(
        ...(Array.isArray(previousExportAst)
          ? previousExportAst
          : [previousExportAst]),
      )
    }
  } else {
    exports.push(t.exportDefaultDeclaration(ctx.exportIdentifier))
  }
  return {
    componentName: opts.state.componentName,
    props,
    interfaces,
    imports,
    exports,
    jsx,
  }
}
