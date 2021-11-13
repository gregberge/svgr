// Inspired by https://github.com/reactjs/react-magic/blob/master/src/htmltojsx.js
import * as t from '@babel/types'
import { hyphenToCamelCase, isNumeric, trimEnd } from './util'

const PX_REGEX = /^\d+px$/
const MS_REGEX = /^-ms-/
const VAR_REGEX = /^--/

/**
 * Determines if the CSS value can be converted from a
 * 'px' suffixed string to a numeric value.
 */
const isConvertiblePixelValue = (value: string) => {
  return PX_REGEX.test(value)
}

/**
 * Format style key into JSX style object key.
 */
const formatKey = (key: string) => {
  if (VAR_REGEX.test(key)) {
    return t.stringLiteral(key)
  }
  key = key.toLowerCase()
  // Don't capitalize -ms- prefix
  if (MS_REGEX.test(key)) key = key.substr(1)
  return t.identifier(hyphenToCamelCase(key))
}

/**
 * Format style value into JSX style object value.
 */
const formatValue = (value: string) => {
  if (isNumeric(value)) return t.numericLiteral(Number(value))
  if (isConvertiblePixelValue(value))
    return t.numericLiteral(Number(trimEnd(value, 'px')))
  return t.stringLiteral(value)
}

/**
 * Handle parsing of inline styles.
 */
export const stringToObjectStyle = (rawStyle: string): t.ObjectExpression => {
  const entries = rawStyle.split(';')
  const properties = []

  let index = -1

  while (++index < entries.length) {
    const entry = entries[index]
    const style = entry.trim()
    const firstColon = style.indexOf(':')
    const value = style.substr(firstColon + 1).trim()
    const key = style.substr(0, firstColon)
    if (key !== '') {
      const property = t.objectProperty(formatKey(key), formatValue(value))
      properties.push(property)
    }
  }

  return t.objectExpression(properties)
}
