import { cwd } from 'node:process'
import { pathToFileURL } from 'node:url'

const baseURL = pathToFileURL(`${cwd()}/`).href
const SVG_REGEX = /^[./a-zA-Z0-9$_-]+\.svg$/

export async function resolve(specifier, context, defaultResolve) {
  if (SVG_REGEX.test(specifier)) {
    return { url: new URL('./__mocks__/svg.js', baseURL).href }
  }
  return defaultResolve(specifier, context, defaultResolve)
}
