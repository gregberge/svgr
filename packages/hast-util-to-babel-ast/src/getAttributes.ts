import * as t from '@babel/types'
import type { ElementNode } from 'svg-parser'
import { isNumeric, kebabCase, replaceSpaces } from './util'
import { stringToObjectStyle } from './stringToObjectStyle'
import { ATTRIBUTE_MAPPING, ELEMENT_ATTRIBUTE_MAPPING } from './mappings'

const convertAriaAttribute = (kebabKey: string) => {
  const [aria, ...parts] = kebabKey.split('-')
  return `${aria}-${parts.join('').toLowerCase()}`
}

const getKey = (key: string, node: ElementNode) => {
  const lowerCaseKey = key.toLowerCase()
  const mappedElementAttribute =
    // @ts-ignore
    ELEMENT_ATTRIBUTE_MAPPING[node.name] &&
    // @ts-ignore
    ELEMENT_ATTRIBUTE_MAPPING[node.name][lowerCaseKey]
  // @ts-ignore
  const mappedAttribute = ATTRIBUTE_MAPPING[lowerCaseKey]

  if (mappedElementAttribute || mappedAttribute) {
    return t.jsxIdentifier(mappedElementAttribute || mappedAttribute)
  }

  const kebabKey = kebabCase(key)

  if (kebabKey.startsWith('aria-')) {
    return t.jsxIdentifier(convertAriaAttribute(kebabKey))
  }

  if (kebabKey.startsWith('data-')) {
    return t.jsxIdentifier(kebabKey)
  }

  return t.jsxIdentifier(key)
}

const getValue = (key: string, value: string[] | string | number) => {
  // Handle className
  if (Array.isArray(value)) {
    return t.stringLiteral(replaceSpaces(value.join(' ')))
  }

  if (key === 'style') {
    return t.jsxExpressionContainer(stringToObjectStyle(value as string))
  }

  if (typeof value === 'number' || isNumeric(value)) {
    return t.jsxExpressionContainer(t.numericLiteral(Number(value)))
  }

  return t.stringLiteral(replaceSpaces(value))
}

export const getAttributes = (node: ElementNode): t.JSXAttribute[] => {
  if (!node.properties) return []
  const keys = Object.keys(node.properties)
  const attributes = []
  let index = -1

  while (++index < keys.length) {
    const key = keys[index]
    const value = node.properties[key]
    const attribute = t.jsxAttribute(getKey(key, node), getValue(key, value))
    attributes.push(attribute)
  }

  return attributes
}
