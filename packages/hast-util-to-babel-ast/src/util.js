/**
 * Determines if the specified string consists entirely of numeric characters.
 *
 * @param {*} [value]
 * @returns {boolean}
 */
export function isNumeric(value) {
  return !Number.isNaN(value - parseFloat(value))
}

/**
 * Convert a hyphenated string to camelCase.
 *
 * @param {string} string
 * @returns {string}
 */
export function hyphenToCamelCase(string) {
  return string.replace(/-(.)/g, (match, chr) => chr.toUpperCase())
}

/**
 * Trim the specified substring off the string. If the string does not end
 * with the specified substring, this is a no-op.
 *
 * @param {string} haystack String to search in
 * @param {string} needle   String to search for
 * @return {string}
 */
export function trimEnd(haystack, needle) {
  return haystack.endsWith(needle)
    ? haystack.slice(0, -needle.length)
    : haystack
}
