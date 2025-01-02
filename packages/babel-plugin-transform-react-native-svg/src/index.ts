/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NodePath, types as t } from '@babel/core'

interface State {
  replacedComponents: Set<string>
  unsupportedComponents: Set<string>
  filterComponents: Set<string>
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
  filter: 'Filter',
  fegaussianblur: 'FeGaussianBlur',
  feblend: 'FeBlend',
  fecolormatrix: 'FeColorMatrix',
  fecomponenttransfer: 'FeComponentTransfer',
  fecomposite: 'FeComposite',
  feconvolvematrix: 'FeConvolveMatrix',
  fediffuselighting: 'FeDiffuseLighting',
  fedisplacementmap: 'FeDisplacementMap',
  fedropshadow: 'FeDropShadow',
  feflood: 'FeFlood',
  fefunca: 'FeFuncA',
  fefuncb: 'FeFuncB',
  fefuncg: 'FeFuncG',
  fefuncr: 'FeFuncR',
  feimage: 'FeImage',
  femerge: 'FeMerge',
  femergenode: 'FeMergeNode',
  femorphology: 'FeMorphology',
  feoffset: 'FeOffset',
  fepointlight: 'FePointLight',
  fespecularlighting: 'FeSpecularLighting',
  fespotlight: 'FeSpotLight',
  fetile: 'FeTile',
  feturbulence: 'FeTurbulence',
}

const plugin = () => {
  function replaceElement(path: NodePath<t.JSXElement>, state: State) {
    const namePath = path.get('openingElement').get('name')
    if (!namePath.isJSXIdentifier()) return
    const { name } = namePath.node

    // Replace element by react-native-svg components
    const component = elementToComponent[name.toLowerCase()] // Case insensitive
    if (component) {
      namePath.replaceWith(t.jsxIdentifier(component))
      if (path.has('closingElement')) {
        const closingNamePath = path
          .get('closingElement')
          .get('name') as NodePath<t.JSXIdentifier>
        closingNamePath.replaceWith(t.jsxIdentifier(component))
      }
      // Add filter elements to show warning
      if (name.includes('fe') || name.includes('filter')) {
        state.filterComponents.add(name)
      }
      state.replacedComponents.add(component)
      return
    }

    // Remove unsupported element
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

      if (state.filterComponents.size && !path.has('trailingComments')) {
        state.filterComponents.forEach((filter) => {
          if (
            !path
              .get('specifiers')
              .some((specifier) =>
                specifier
                  .get('local')
                  .isIdentifier({ name: elementToComponent[filter] }),
              )
          ) {
            if (elementToComponent[filter]) {
              path.pushContainer(
                'specifiers',
                t.importSpecifier(
                  t.identifier(elementToComponent[filter]),
                  t.identifier(elementToComponent[filter]),
                ),
              )
            }
          }
        })
        path.addComment(
          'trailing',
          ` Using svg filters is only supported on react-native-svg v15.5.0 or later. `,
        )
      }
    },
  }

  return {
    visitor: {
      Program(path: NodePath<t.Program>, state: Partial<State>) {
        state.replacedComponents = new Set()
        state.unsupportedComponents = new Set()
        state.filterComponents = new Set()

        path.traverse(svgElementVisitor, state as State)
        path.traverse(importDeclarationVisitor, state as State)
      },
    },
  }
}

export default plugin
