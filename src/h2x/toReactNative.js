const elementToComponent = {
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
}

const componentToElement = Object.keys(elementToComponent).reduce(
  (map, key) => ({ ...map, [elementToComponent[key]]: key }),
  {},
)

const toReactNative = () => ({
  visitor: {
    JSXElement: {
      enter(path, state) {
        // Replace element by react-native-svg components
        const component = elementToComponent[path.node.name]
        if (component) {
          path.node.name = component
          state.reactNativeSvgReplacedComponents =
            state.reactNativeSvgReplacedComponents || new Set()
          state.reactNativeSvgReplacedComponents.add(component)
          return
        }

        // Remove element if not supported
        if (!componentToElement[path.node.name]) {
          state.unsupportedComponents = state.unsupportedComponents || new Set()
          state.unsupportedComponents.add(path.node.name)
          path.remove()
        }
      },
    },
  },
})

export default toReactNative
