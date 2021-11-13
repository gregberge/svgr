/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ConfigAPI } from '@babel/core'
import addJSXAttribute, {
  Attribute,
} from '@svgr/babel-plugin-add-jsx-attribute'
import removeJSXAttribute from '@svgr/babel-plugin-remove-jsx-attribute'
import removeJSXEmptyExpression from '@svgr/babel-plugin-remove-jsx-empty-expression'
import replaceJSXAttributeValue, {
  Value,
} from '@svgr/babel-plugin-replace-jsx-attribute-value'
import svgDynamicTitle from '@svgr/babel-plugin-svg-dynamic-title'
import svgEmDimensions from '@svgr/babel-plugin-svg-em-dimensions'
import transformReactNativeSVG from '@svgr/babel-plugin-transform-react-native-svg'
import transformSvgComponent, {
  Options as TransformOptions,
} from '@svgr/babel-plugin-transform-svg-component'

export interface Options extends TransformOptions {
  ref?: boolean
  titleProp?: boolean
  expandProps?: boolean | 'start' | 'end'
  dimensions?: boolean
  icon?: boolean | string | number
  native?: boolean
  svgProps?: { [key: string]: string }
  replaceAttrValues?: { [key: string]: string }
}

const getAttributeValue = (value: string) => {
  const literal =
    typeof value === 'string' && value.startsWith('{') && value.endsWith('}')
  return { value: literal ? value.slice(1, -1) : value, literal }
}

const propsToAttributes = (props: { [key: string]: string }): Attribute[] => {
  return Object.keys(props).map((name) => {
    const { literal, value } = getAttributeValue(props[name])
    return { name, literal, value }
  })
}

function replaceMapToValues(replaceMap: { [key: string]: string }): Value[] {
  return Object.keys(replaceMap).map((value) => {
    const { literal, value: newValue } = getAttributeValue(replaceMap[value])
    return { value, newValue, literal }
  })
}

const plugin = (_: ConfigAPI, opts: Options) => {
  let toRemoveAttributes = ['version']
  let toAddAttributes: Attribute[] = []

  if (opts.svgProps) {
    toAddAttributes = [...toAddAttributes, ...propsToAttributes(opts.svgProps)]
  }

  if (opts.ref) {
    toAddAttributes = [
      ...toAddAttributes,
      {
        name: 'ref',
        value: 'ref',
        literal: true,
      },
    ]
  }

  if (opts.titleProp) {
    toAddAttributes = [
      ...toAddAttributes,
      {
        name: 'aria-labelledby',
        value: 'titleId',
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
        position:
          opts.expandProps === 'start' || opts.expandProps === 'end'
            ? opts.expandProps
            : undefined,
      },
    ]
  }

  if (!opts.dimensions) {
    toRemoveAttributes = [...toRemoveAttributes, 'width', 'height']
  }

  const plugins: any[] = [
    [transformSvgComponent, opts],
    ...(opts.icon !== false && opts.dimensions
      ? [
          [
            svgEmDimensions,
            opts.icon !== true
              ? { width: opts.icon, height: opts.icon }
              : opts.native
              ? { width: 24, height: 24 }
              : {},
          ],
        ]
      : []),
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
    plugins.push([
      replaceJSXAttributeValue,
      { values: replaceMapToValues(opts.replaceAttrValues) },
    ])
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
