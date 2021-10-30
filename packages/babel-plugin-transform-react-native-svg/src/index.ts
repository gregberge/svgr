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
      if (path.get('source').isStringLiteral({ value: 'react-native-svg' })) {
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
      },
    },
  }
}

export default plugin
