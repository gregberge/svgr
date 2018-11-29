import * as t from '@babel/types'
import { isNumeric, kebabCase, replaceSpaces } from './util'
import stringToObjectStyle from './stringToObjectStyle'
import { ATTRIBUTE_MAPPING, ELEMENT_ATTRIBUTE_MAPPING } from './mappings'

function getKey(key, value, node) {
  const kebabKey = kebabCase(key)
  if (kebabKey.startsWith('aria-') || kebabKey.startsWith('data-')) {
    return t.jsxIdentifier(kebabKey)
  }
  const lowerCaseKey = key.toLowerCase()
  const mappedElementAttribute =
    ELEMENT_ATTRIBUTE_MAPPING[node.name] &&
    ELEMENT_ATTRIBUTE_MAPPING[node.name][lowerCaseKey]
  const mappedAttribute = ATTRIBUTE_MAPPING[lowerCaseKey]
  return t.jsxIdentifier(mappedElementAttribute || mappedAttribute || key)
}

function getValue(key, value) {
  // Handle className
  if (Array.isArray(value)) {
    return t.stringLiteral(replaceSpaces(value.join(' ')))
  }

  if (key === 'style') {
    return t.jsxExpressionContainer(stringToObjectStyle(value))
  }

  if (isNumeric(value) && key !== 'fontWeight') {
    return t.jsxExpressionContainer(t.numericLiteral(Number(value)))
  }

  return t.stringLiteral(replaceSpaces(value))
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
