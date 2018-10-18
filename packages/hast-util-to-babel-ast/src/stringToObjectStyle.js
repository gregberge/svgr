// Inspired by https://github.com/reactjs/react-magic/blob/master/src/htmltojsx.js
import * as t from '@babel/types'
import { hyphenToCamelCase, isNumeric, trimEnd } from './util'

/**
 * Determines if the CSS value can be converted from a
 * 'px' suffixed string to a numeric value.
 *
 * @param {string} value CSS property value
 * @return {boolean}
 */
function isConvertiblePixelValue(value) {
  return /^\d+px$/.test(value)
}

/**
 * Format style key into JSX style object key.
 *
 * @param {string} key
 * @return {string}
 */
function formatKey(key) {
  key = key.toLowerCase()
  // Don't capitalize -ms- prefix
  if (/^-ms-/.test(key)) key = key.substr(1)
  return t.identifier(hyphenToCamelCase(key))
}

/**
 * Format style value into JSX style object value.
 *
 * @param {string} key
 * @return {string}
 */
function formatValue(value) {
  if (isNumeric(value)) return t.numericLiteral(Number(value))
  if (isConvertiblePixelValue(value))
    return t.numericLiteral(Number(trimEnd(value, 'px')))
  return t.stringLiteral(value)
}

/**
 * Handle parsing of inline styles.
 *
 * @param {string} rawStyle
 * @returns {object}
 */
function stringToObjectStyle(rawStyle) {
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

export default stringToObjectStyle
