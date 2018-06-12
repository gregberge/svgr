import { JSXAttribute } from 'h2x-plugin-jsx'

const compareAttrsName = attr => otherAttr => attr.name === otherAttr.name
const compareAttrsValue = attr => otherAttr => attr.value === otherAttr.value

const compareAttrs = attr => otherAttr =>
  compareAttrsName(attr)(otherAttr) && compareAttrsValue(attr)(otherAttr)

const areAttrsAlreadyInjected = (node, attributes = {}) => {
  const nodeAttrs = node.attributes

  return Object.keys(attributes).reduce((accumulation, key) => {
    if (nodeAttrs.some(compareAttrs({ name: key, value: attributes[key] })))
      return accumulation
    return false
  }, true)
}

const svgAttribute = (attributes = {}) => () => {
  const keys = Object.keys(attributes)

  return {
    visitor: {
      JSXElement: {
        enter(path) {
          if (path.node.name !== 'svg') return
          if (areAttrsAlreadyInjected(path.node, attributes)) return

          const parseAttributes = keys.reduce((accumulation, key) => {
            const props = new JSXAttribute()
            props.name = key
            props.value = attributes[key]
            return [...accumulation, props]
          }, [])

          const mergeAttributes = path.node.attributes.reduce(
            (accumulation, value) => {
              if (accumulation.some(compareAttrsName(value)))
                return accumulation
              return [...accumulation, value]
            },
            parseAttributes,
          )

          path.node.attributes = mergeAttributes
          path.replace(path.node)
        },
      },
    },
  }
}

export default svgAttribute
