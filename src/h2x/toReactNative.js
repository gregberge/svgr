const supportedElements = {
  svg: 'Svg',
  circle: 'Circle',
  ellipse: 'Ellipse',
  g: 'G',
  linearGradient: 'LinearGradient',
  radialGradient: 'RadialGradient',
  line: 'Line',
  path: 'Path',
  polygon: 'Polygon',
  polyline: 'Polyline',
  rect: 'Rect',
  symbol: 'Symbol',
  text: 'Text',
  use: 'Use',
  defs: 'Defs',
  stop: 'Stop',
}

const reverse = Object.keys(supportedElements).reduce(
  (map, key) => ({ ...map, [supportedElements[key]]: key }),
  {},
)

const toReactNative = () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        if (supportedElements[path.node.name]) {
          path.node.name = supportedElements[path.node.name]
        } else if (!reverse[path.node.name]) {
          path.remove()
        }
      },
    },
  },
})

export default toReactNative
