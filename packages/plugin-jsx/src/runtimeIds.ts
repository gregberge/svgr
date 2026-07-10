import { ConfigAPI, NodePath, types as t } from '@babel/core'

const URL_REFERENCE_PATTERN = /url\((["']?)#([^)"']+)\1\)/g
const HASH_REFERENCE_ATTRIBUTES = new Set(['href', 'xlink:href', 'xlinkHref'])

const getJsxAttributeName = (node: t.JSXAttribute) => {
  if (t.isJSXIdentifier(node.name)) {
    return node.name.name
  }

  if (t.isJSXNamespacedName(node.name)) {
    return `${node.name.namespace.name}:${node.name.name.name}`
  }

  return null
}

const getStringLiteralValue = (node: t.JSXAttribute['value']) => {
  if (!node) return null
  if (t.isStringLiteral(node)) return node.value
  if (t.isJSXExpressionContainer(node) && t.isStringLiteral(node.expression)) {
    return node.expression.value
  }
  return null
}

const expressionForRuntimeId = (getSvgIdIdentifier: t.Identifier, id: string) =>
  t.callExpression(t.cloneNode(getSvgIdIdentifier), [t.stringLiteral(id)])

const expressionForReferencedString = (
  getSvgIdIdentifier: t.Identifier,
  value: string,
  svgIds: Set<string>,
) => {
  let lastIndex = 0
  const parts: t.Expression[] = []

  value.replace(URL_REFERENCE_PATTERN, (match, urlQuote, id, offset) => {
    if (!svgIds.has(id)) {
      return match
    }

    if (offset > lastIndex) {
      parts.push(t.stringLiteral(value.slice(lastIndex, offset)))
    }

    parts.push(t.stringLiteral(`url(${urlQuote}#`))
    parts.push(expressionForRuntimeId(getSvgIdIdentifier, id))
    parts.push(t.stringLiteral(`${urlQuote})`))

    lastIndex = offset + match.length
    return match
  })

  if (parts.length === 0) return null

  if (lastIndex < value.length) {
    parts.push(t.stringLiteral(value.slice(lastIndex)))
  }

  return parts.reduce<t.Expression | null>((expression, part) => {
    if (!expression) return part
    return t.binaryExpression('+', expression, part)
  }, null)
}

const expressionForHashReference = (
  getSvgIdIdentifier: t.Identifier,
  value: string,
  svgIds: Set<string>,
) => {
  if (!value.startsWith('#')) return null

  const id = value.slice(1)
  if (!svgIds.has(id)) return null

  return t.binaryExpression(
    '+',
    t.stringLiteral('#'),
    expressionForRuntimeId(getSvgIdIdentifier, id),
  )
}

const hasSvgElement = (path: NodePath<t.Function>) => {
  let found = false

  path.traverse({
    Function(innerPath) {
      if (innerPath !== path) {
        innerPath.skip()
      }
    },
    JSXOpeningElement(jsxPath) {
      if (t.isJSXIdentifier(jsxPath.node.name, { name: 'svg' })) {
        found = true
        jsxPath.stop()
      }
    },
  })

  return found
}

const isComponentFunction = (
  path: NodePath<t.Function>,
  componentName: string,
) => {
  if (path.isFunctionDeclaration()) {
    return path.node.id?.name === componentName
  }

  if (!path.isArrowFunctionExpression() && !path.isFunctionExpression()) {
    return false
  }

  return (
    path.parentPath.isVariableDeclarator() &&
    t.isIdentifier(path.parentPath.node.id, { name: componentName })
  )
}

const createUseIdCall = (
  programPath: NodePath<t.Program>,
  importSource: string,
) => {
  for (const statement of programPath.node.body) {
    if (
      !t.isImportDeclaration(statement) ||
      statement.source.value !== importSource ||
      statement.importKind === 'type'
    ) {
      continue
    }

    const useIdSpecifier = statement.specifiers.find(
      (specifier) =>
        t.isImportSpecifier(specifier) &&
        specifier.importKind !== 'type' &&
        t.isIdentifier(specifier.imported, { name: 'useId' }),
    )
    if (useIdSpecifier) {
      return t.callExpression(t.cloneNode(useIdSpecifier.local), [])
    }

    const namespaceSpecifier = statement.specifiers.find((specifier) =>
      t.isImportNamespaceSpecifier(specifier),
    )
    if (namespaceSpecifier) {
      return t.callExpression(
        t.memberExpression(
          t.cloneNode(namespaceSpecifier.local),
          t.identifier('useId'),
        ),
        [],
      )
    }

    const defaultSpecifier = statement.specifiers.find((specifier) =>
      t.isImportDefaultSpecifier(specifier),
    )
    if (defaultSpecifier) {
      return t.callExpression(
        t.memberExpression(
          t.cloneNode(defaultSpecifier.local),
          t.identifier('useId'),
        ),
        [],
      )
    }
  }

  const useIdIdentifier = programPath.scope.generateUidIdentifier('useId')
  const useIdSpecifier = t.importSpecifier(
    t.cloneNode(useIdIdentifier),
    t.identifier('useId'),
  )
  const existingImport = programPath.node.body.find(
    (statement) =>
      t.isImportDeclaration(statement) &&
      statement.source.value === importSource &&
      statement.importKind !== 'type' &&
      !statement.specifiers.some((specifier) =>
        t.isImportNamespaceSpecifier(specifier),
      ),
  )

  if (existingImport && t.isImportDeclaration(existingImport)) {
    existingImport.specifiers.push(useIdSpecifier)
  } else {
    programPath.unshiftContainer(
      'body',
      t.importDeclaration([useIdSpecifier], t.stringLiteral(importSource)),
    )
  }

  return t.callExpression(t.cloneNode(useIdIdentifier), [])
}

const createRuntimeIdStatements = (
  programPath: NodePath<t.Program>,
  svgIdIdentifier: t.Identifier,
  getSvgIdIdentifier: t.Identifier,
  importSource: string,
  typescript: boolean,
) => {
  const useIdCall = createUseIdCall(programPath, importSource)
  const sanitizedUseIdCall = t.callExpression(
    t.memberExpression(useIdCall, t.identifier('replace')),
    [t.regExpLiteral('[^A-Za-z0-9_-]', 'g'), t.stringLiteral('_')],
  )

  const idIdentifier = t.identifier('id')
  if (typescript) {
    idIdentifier.typeAnnotation = t.tsTypeAnnotation(t.tsStringKeyword())
  }

  return [
    t.variableDeclaration('const', [
      t.variableDeclarator(t.cloneNode(svgIdIdentifier), sanitizedUseIdCall),
    ]),
    t.variableDeclaration('const', [
      t.variableDeclarator(
        t.cloneNode(getSvgIdIdentifier),
        t.arrowFunctionExpression(
          [idIdentifier],
          t.templateLiteral(
            [
              t.templateElement({ raw: '', cooked: '' }),
              t.templateElement({ raw: '-', cooked: '-' }),
              t.templateElement({ raw: '', cooked: '' }, true),
            ],
            [t.cloneNode(svgIdIdentifier), t.identifier('id')],
          ),
        ),
      ),
    ]),
  ]
}

const injectRuntimeIds = (
  programPath: NodePath<t.Program>,
  path: NodePath<t.Function>,
  componentName: string,
  svgIdIdentifier: t.Identifier,
  getSvgIdIdentifier: t.Identifier,
  importSource: string,
  typescript: boolean,
) => {
  if (!isComponentFunction(path, componentName) || !hasSvgElement(path)) {
    return false
  }

  const statements = createRuntimeIdStatements(
    programPath,
    svgIdIdentifier,
    getSvgIdIdentifier,
    importSource,
    typescript,
  )

  if (path.isArrowFunctionExpression() && !t.isBlockStatement(path.node.body)) {
    path.node.body = t.blockStatement([
      ...statements,
      t.returnStatement(path.node.body),
    ])
    return true
  }

  const bodyPath = path.get('body')
  if (bodyPath.isBlockStatement()) {
    bodyPath.unshiftContainer('body', statements)
    return true
  }

  return false
}

const rewriteRuntimeIdReferences = (
  programPath: NodePath<t.Program>,
  getSvgIdIdentifier: t.Identifier,
  svgIds: Set<string>,
) => {
  programPath.traverse({
    JSXAttribute(attributePath: NodePath<t.JSXAttribute>) {
      const attributeName = getJsxAttributeName(attributePath.node)
      const attributeValue = getStringLiteralValue(attributePath.node.value)

      if (!attributeName || !attributeValue) {
        const valuePath = attributePath.get('value')
        if (
          valuePath.isJSXExpressionContainer() &&
          valuePath.get('expression').isObjectExpression()
        ) {
          valuePath.get('expression').traverse({
            StringLiteral(stringPath) {
              const expression = expressionForReferencedString(
                getSvgIdIdentifier,
                stringPath.node.value,
                svgIds,
              )
              if (expression) {
                stringPath.replaceWith(expression)
              }
            },
          })
        }
        return
      }

      if (attributeName === 'id' && svgIds.has(attributeValue)) {
        attributePath.node.value = t.jsxExpressionContainer(
          expressionForRuntimeId(getSvgIdIdentifier, attributeValue),
        )
        return
      }

      const expression = HASH_REFERENCE_ATTRIBUTES.has(attributeName)
        ? expressionForHashReference(getSvgIdIdentifier, attributeValue, svgIds)
        : expressionForReferencedString(
            getSvgIdIdentifier,
            attributeValue,
            svgIds,
          )
      if (expression) {
        attributePath.node.value = t.jsxExpressionContainer(expression)
      }
    },
  })
}

interface Options {
  componentName?: string
  importSource?: string
  typescript?: boolean
}

const runtimeIdsPlugin = (_: ConfigAPI, opts: Options = {}) => {
  const componentName = opts.componentName ?? 'SvgComponent'
  const importSource = opts.importSource ?? 'react'
  const typescript = opts.typescript ?? false
  let svgIds = new Set<string>()
  let svgIdIdentifier: t.Identifier | null = null
  let getSvgIdIdentifier: t.Identifier | null = null

  return {
    name: 'svgr-runtime-ids',
    visitor: {
      Program: {
        enter(programPath: NodePath<t.Program>) {
          svgIds = new Set()
          programPath.traverse({
            JSXAttribute(attributePath) {
              const attributeName = getJsxAttributeName(attributePath.node)
              const attributeValue = getStringLiteralValue(
                attributePath.node.value,
              )
              if (attributeName === 'id' && attributeValue) {
                svgIds.add(attributeValue)
              }
            },
          })

          svgIdIdentifier = programPath.scope.generateUidIdentifier('svgId')
          getSvgIdIdentifier =
            programPath.scope.generateUidIdentifier('getSvgId')
        },
        exit(programPath: NodePath<t.Program>) {
          if (!svgIds.size || !svgIdIdentifier || !getSvgIdIdentifier) return

          let injected = false
          programPath.traverse({
            Function(functionPath) {
              if (injected) return
              injected = injectRuntimeIds(
                programPath,
                functionPath,
                componentName,
                svgIdIdentifier as t.Identifier,
                getSvgIdIdentifier as t.Identifier,
                importSource,
                typescript,
              )
            },
          })

          if (injected) {
            rewriteRuntimeIdReferences(programPath, getSvgIdIdentifier, svgIds)
          }
        },
      },
    },
  }
}

export default runtimeIdsPlugin
