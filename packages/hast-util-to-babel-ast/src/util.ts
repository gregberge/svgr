/**
 * Determines if the specified string consists entirely of numeric characters.
 */
export const isNumeric = (value: number | string): boolean => {
  // @ts-ignore
  return !Number.isNaN(value - parseFloat(value))
}

/**
 * Convert a hyphenated string to camelCase.
 */
export const hyphenToCamelCase = (string: string): string => {
  return string.replace(/-(.)/g, (_, chr) => chr.toUpperCase())
}

/**
 * Trim the specified substring off the string. If the string does not end
 * with the specified substring, this is a no-op.
 *
 * @param {string} haystack String to search in
 * @param {string} needle   String to search for
 */
export const trimEnd = (haystack: string, needle: string): string => {
  return haystack.endsWith(needle)
    ? haystack.slice(0, -needle.length)
    : haystack
}

const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g

export const kebabCase = (str: string): string => {
  return str.replace(KEBAB_REGEX, (match) => `-${match.toLowerCase()}`)
}

const SPACES_REGEXP = /[\t\r\n\u0085\u2028\u2029]+/g

export const replaceSpaces = (str: string): string => {
  return str.replace(SPACES_REGEXP, ' ')
}
