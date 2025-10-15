/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NodePath, types as t } from '@babel/core'

interface State {
  replacedComponents: Set<string>
  unsupportedComponents: Set<string>
}

const elementToComponent: { [key: string]: string } = {
  svg: 'Svg',
  circle: 'Circle',
  clipPath: 'ClipPath',
  ellipse: 'Ellipse',
  g: 'G',
  linearGradient: 'LinearGradient',
  radialGradient: 'RadialGradient',
  line: 'Line',
  path: 'Path',
  pattern: 'Pattern',
  polygon: 'Polygon',
  polyline: 'Polyline',
  rect: 'Rect',
  symbol: 'Symbol',
  text: 'Text',
  textPath: 'TextPath',
  tspan: 'TSpan',
  use: 'Use',
  defs: 'Defs',
  stop: 'Stop',
  mask: 'Mask',
  image: 'Image',
  foreignObject: 'ForeignObject',
}

const plugin = () => {
  function isIdPresentInAst(path: NodePath<t.Program>, id: string): boolean {
    let found = false
    path.traverse({
      JSXAttribute(attrPath: NodePath<t.JSXAttribute>) {
        if (attrPath.node.name && attrPath.node.name.name === 'id') {
          const valueNode = attrPath.node.value
          if (
            valueNode &&
            valueNode.type === 'StringLiteral' &&
            valueNode.value === id
          ) {
            found = true
            attrPath.stop()
          }
        }
      },
    })
    return found
  }

  function replaceElement(path: NodePath<t.JSXElement>, state: State) {
    const namePath = path.get('openingElement').get('name')
    if (!namePath.isJSXIdentifier()) return
    const { name } = namePath.node

    // Replace element by react-native-svg components
    const component = elementToComponent[name]

    if (component) {
      namePath.replaceWith(t.jsxIdentifier(component))
      if (path.has('closingElement')) {
        const closingNamePath = path
          .get('closingElement')
          .get('name') as NodePath<t.JSXIdentifier>
        closingNamePath.replaceWith(t.jsxIdentifier(component))
      }
      state.replacedComponents.add(component)
      return
    }

    // Remove element if not supported
    state.unsupportedComponents.add(name)
    path.remove()
  }

  const svgElementVisitor = {
    JSXElement(path: NodePath<t.JSXElement>, state: State) {
      if (
        !path.get('openingElement').get('name').isJSXIdentifier({ name: 'svg' })
      ) {
        return
      }

      replaceElement(path, state)
      path.traverse(jsxElementVisitor, state)
    },
  }

  const jsxElementVisitor = {
    JSXElement(path: NodePath<t.JSXElement>, state: State) {
      replaceElement(path, state)
    },
  }

  const importDeclarationVisitor = {
    ImportDeclaration(path: NodePath<t.ImportDeclaration>, state: State) {
      const isNotTypeImport =
        !path.get('importKind').hasNode() ||
        path.node.importKind == null ||
        path.node.importKind === 'value'
      if (
        path.get('source').isStringLiteral({ value: 'react-native-svg' }) &&
        isNotTypeImport
      ) {
        state.replacedComponents.forEach((component) => {
          if (
            path
              .get('specifiers')
              .some((specifier) =>
                specifier.get('local').isIdentifier({ name: component }),
              )
          ) {
            return
          }

          path.pushContainer(
            'specifiers',
            t.importSpecifier(t.identifier(component), t.identifier(component)),
          )
        })
      } else if (path.get('source').isStringLiteral({ value: 'expo' })) {
        path.pushContainer(
          'specifiers',
          t.importSpecifier(t.identifier('Svg'), t.identifier('Svg')),
        )
      } else {
        return
      }

      if (state.unsupportedComponents.size && !path.has('trailingComments')) {
        const componentList = [...state.unsupportedComponents].join(', ')
        path.addComment(
          'trailing',
          ` SVGR has dropped some elements not supported by react-native-svg: ${componentList} `,
        )
      }
    },
  }

  return {
    visitor: {
      Program(path: NodePath<t.Program>, state: Partial<State>) {
        state.replacedComponents = new Set()
        state.unsupportedComponents = new Set()

        path.traverse(svgElementVisitor, state as State)
        path.traverse(importDeclarationVisitor, state as State)

        if (state.unsupportedComponents && state.unsupportedComponents.size > 0) {
          const unsupportedSet = new Set(state.unsupportedComponents)
          path.traverse({
            JSXElement(innerPath: NodePath<t.JSXElement>) {
              const openingName = innerPath.get('openingElement').get('name')
              if (
                openingName.isJSXIdentifier() &&
                unsupportedSet.has(openingName.node.name)
              ) {
                innerPath.remove()
                return
              }
              if (innerPath.has('closingElement')) {
                const closingName = innerPath.get('closingElement').get('name')
                if (
                  !Array.isArray(closingName) &&
                  closingName.isJSXIdentifier() &&
                  unsupportedSet.has(closingName.node.name)
                ) {
                  innerPath.remove()
                }
              }
            },
            JSXIdentifier(innerPath: NodePath<t.JSXIdentifier>) {
              if (unsupportedSet.has(innerPath.node.name)) {
                if (
                  innerPath.parentPath.isJSXOpeningElement() ||
                  innerPath.parentPath.isJSXClosingElement()
                ) {
                  innerPath.parentPath.remove()
                }
              }
            },
          })
        }

        if (state.unsupportedComponents && state.unsupportedComponents.size > 0) {
          path.traverse({
            JSXAttribute(attrPath: NodePath<t.JSXAttribute>) {
              const attrName =
                attrPath.node.name && attrPath.node.name.name
              if (!attrName || typeof attrName !== 'string') return
              const relevantAttrs = [
                'filter',
                'clipPath',
                'mask',
                'fill',
                'stroke',
                'href',
                'xlinkHref',
                'style',
              ]
              if (!relevantAttrs.includes(attrName)) return
              const valueNode = attrPath.node.value
              if (!valueNode) return
              if (
                valueNode.type === 'StringLiteral' &&
                /^url\(#.+\)$/.test(valueNode.value)
              ) {
                const refId = valueNode.value.match(/^url\(#(.+)\)$/)?.[1]
                if (refId && !isIdPresentInAst(path, refId)) {
                  attrPath.remove()
                }
              }
              if (
                valueNode.type === 'JSXExpressionContainer' &&
                valueNode.expression.type === 'StringLiteral' &&
                /^url\(#.+\)$/.test(valueNode.expression.value)
              ) {
                const refId = valueNode.expression.value.match(
                  /^url\(#(.+)\)$/,
                )?.[1]
                if (refId && !isIdPresentInAst(path, refId)) {
                  attrPath.remove()
                }
              }
            },
          })
        }

        if (state.unsupportedComponents && state.unsupportedComponents.size > 0) {
          path.traverse({
            JSXElement(innerPath: NodePath<t.JSXElement>) {
              const openingName = innerPath.get('openingElement').get('name')
              if (
                !openingName.isJSXIdentifier() ||
                openingName.node.name !== 'use'
              )
                return
              // Check href or xlinkHref attribute for orphaned reference
              const attrs = innerPath.get('openingElement').get('attributes')
              for (const attr of attrs) {
                if (!attr.isJSXAttribute()) continue
                const attrName = attr.node.name && attr.node.name.name
                              if (attrName !== 'href' && attrName !== 'xlinkHref') continue
              const valueNode = attr.node.value
              let refId: string | null = null
              if (
                  valueNode &&
                  valueNode.type === 'StringLiteral' &&
                  /^#.+$/.test(valueNode.value)
                ) {
                  refId = valueNode.value.slice(1)
                } else if (
                  valueNode &&
                  valueNode.type === 'JSXExpressionContainer' &&
                  valueNode.expression.type === 'StringLiteral' &&
                  /^#.+$/.test(valueNode.expression.value)
                ) {
                  refId = valueNode.expression.value.slice(1)
                }
                if (refId && !isIdPresentInAst(path, refId)) {
                  innerPath.remove()
                  break
                }
              }
            },
          })
        }
      },
    },
  }
}

export default plugin
