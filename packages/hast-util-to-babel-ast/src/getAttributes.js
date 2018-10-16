import * as t from '@babel/types'
import { isNumeric } from './util'
import stringToObjectStyle from './stringToObjectStyle'
import { ATTRIBUTE_MAPPING, ELEMENT_ATTRIBUTE_MAPPING } from './mappings'

function getKey(key, value, node) {
  const mappedElementAttribute =
    ELEMENT_ATTRIBUTE_MAPPING[node.name] &&
    ELEMENT_ATTRIBUTE_MAPPING[node.name][key]
  const mappedAttribute = ATTRIBUTE_MAPPING[key]
  return t.jsxIdentifier(mappedElementAttribute || mappedAttribute || key)
}

function getValue(key, value) {
  // Handle className
  if (Array.isArray(value)) {
    return t.stringLiteral(value.join(' '))
  }

  if (key === 'style') {
    return t.jsxExpressionContainer(stringToObjectStyle(value))
  }

  if (isNumeric(value)) {
    return t.jsxExpressionContainer(t.numericLiteral(Number(value)))
  }

  return t.stringLiteral(value)
}

const getAttributes = node => {
  const keys = Object.keys(node.properties)
  const attributes = []
  let index = -1

  while (++index < keys.length) {
    const key = keys[index]
    const value = node.properties[key]
    const attribute = t.jsxAttribute(
      getKey(key, value, node),
      getValue(key, value, node),
    )
    attributes.push(attribute)
  }

  return attributes
}

export default getAttributes
