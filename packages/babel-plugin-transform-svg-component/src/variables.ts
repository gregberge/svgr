import { types as t } from '@babel/core'
import type { Options, TemplateVariables } from './types'

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
}

const getOrCreateImport = ({ imports }: Context, sourceValue: string) => {
  const existing = imports.find(
    (imp) =>
      imp.source.value === sourceValue &&
      !imp.specifiers.some(
        (specifier) => specifier.type === 'ImportNamespaceSpecifier',
      ),
  )
  if (existing) return existing
  const imp = t.importDeclaration([], t.stringLiteral(sourceValue))
  imports.push(imp)
  return imp
}

const tsTypeReferenceSVGProps = (ctx: Context) => {
  if (ctx.opts.native) {
    const identifier = t.identifier('SvgProps')
    getOrCreateImport(ctx, 'react-native-svg').specifiers.push(
      t.importSpecifier(identifier, identifier),
    )
    return t.tsTypeReference(identifier)
  }
  const identifier = t.identifier('SVGProps')
  getOrCreateImport(ctx, 'react').specifiers.push(
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
  getOrCreateImport(ctx, 'react').specifiers.push(
    t.importSpecifier(identifier, identifier),
  )
  return t.tsTypeReference(
    identifier,
    t.tsTypeParameterInstantiation([
      t.tsTypeReference(t.identifier('SVGSVGElement')),
    ]),
  )
}

export const getVariables = ({
  opts,
  jsx,
}: {
  opts: Options
  jsx: t.JSXElement
}): TemplateVariables => {
  const componentName = t.identifier(opts.state.componentName)
  const interfaces: t.TSInterfaceDeclaration[] = []
  const props: (t.Identifier | t.ObjectPattern)[] = []
  const imports: t.ImportDeclaration[] = []
  const exports: (t.VariableDeclaration | t.ExportDeclaration)[] = []
  const ctx = {
    exportIdentifier: componentName,
    opts,
    interfaces,
    props,
    imports,
    exports,
  }

  imports.push(
    t.importDeclaration(
      [t.importNamespaceSpecifier(t.identifier('React'))],
      t.stringLiteral('react'),
    ),
  )

  if (opts.native) {
    getOrCreateImport(ctx, 'react-native-svg').specifiers.push(
      t.importDefaultSpecifier(t.identifier('Svg')),
    )
  }

  if (opts.titleProp) {
    const prop = t.objectPattern([
      t.objectProperty(
        t.identifier('title'),
        t.identifier('title'),
        false,
        true,
      ),
      t.objectProperty(
        t.identifier('titleId'),
        t.identifier('titleId'),
        false,
        true,
      ),
    ])
    props.push(prop)
    if (opts.typescript) {
      interfaces.push(
        t.tsInterfaceDeclaration(
          t.identifier('SVGRProps'),
          null,
          null,
          t.tSInterfaceBody([
            tsOptionalPropertySignature(
              t.identifier('title'),
              t.tsTypeAnnotation(t.tsStringKeyword()),
            ),
            tsOptionalPropertySignature(
              t.identifier('titleId'),
              t.tsTypeAnnotation(t.tsStringKeyword()),
            ),
          ]),
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
    getOrCreateImport(ctx, 'react').specifiers.push(
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
    getOrCreateImport(ctx, 'react').specifiers.push(
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
    exports.push(
      t.exportNamedDeclaration(null, [
        t.exportSpecifier(ctx.exportIdentifier, t.identifier(opts.namedExport)),
      ]),
    )
  } else {
    exports.push(t.exportDefaultDeclaration(ctx.exportIdentifier))
  }
  return { componentName, props, interfaces, imports, exports, jsx }
}
