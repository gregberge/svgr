import addJSXAttribute from '@svgr/babel-plugin-add-jsx-attribute'
import removeJSXAttribute from '@svgr/babel-plugin-remove-jsx-attribute'
import removeJSXEmptyExpression from '@svgr/babel-plugin-remove-jsx-empty-expression'
import replaceJSXAttributeValue from '@svgr/babel-plugin-replace-jsx-attribute-value'
import svgDynamicTitle from '@svgr/babel-plugin-svg-dynamic-title'
import svgEmDimensions from '@svgr/babel-plugin-svg-em-dimensions'
import transformReactNativeSVG from '@svgr/babel-plugin-transform-react-native-svg'
import transformSvgComponent from '@svgr/babel-plugin-transform-svg-component'

function propsToAttributes(props) {
  return Object.keys(props).map(name => {
    const value = props[name]
    const literal =
      typeof value === 'string' && value.startsWith('{') && value.endsWith('}')

    return { name, value: value.slice(1, -1), literal }
  })
}

const plugin = (api, opts) => {
  let toRemoveAttributes = ['xmlns', 'xmlnsXlink', 'version']
  let toAddAttributes = []

  if (opts.svgProps) {
    toAddAttributes = [...toAddAttributes, ...propsToAttributes(opts.svgProps)]
  }

  if (opts.ref) {
    toAddAttributes = [
      ...toAddAttributes,
      {
        name: 'ref',
        value: 'svgRef',
        literal: true,
      },
    ]
  }

  if (opts.expandProps) {
    toAddAttributes = [
      ...toAddAttributes,
      {
        name: 'props',
        spread: true,
        position: opts.expandProps,
      },
    ]
  }

  if (!opts.dimensions) {
    toRemoveAttributes = [...toRemoveAttributes, 'width', 'height']
  }

  const plugins = [
    [transformSvgComponent, opts],
    [
      removeJSXAttribute,
      { elements: ['svg', 'Svg'], attributes: toRemoveAttributes },
    ],
    [
      addJSXAttribute,
      { elements: ['svg', 'Svg'], attributes: toAddAttributes },
    ],
    removeJSXEmptyExpression,
  ]

  if (opts.replaceAttrValues) {
    plugins.push([replaceJSXAttributeValue, { values: opts.replaceAttrValues }])
  }

  if (opts.icon && opts.dimensions) {
    plugins.push(svgEmDimensions)
  }

  if (opts.titleProp) {
    plugins.push(svgDynamicTitle)
  }

  if (opts.native) {
    plugins.push(transformReactNativeSVG)
  }

  return { plugins }
}

export default plugin
