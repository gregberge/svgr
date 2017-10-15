import { rename } from './dirCommand'

describe('rename', () => {
  it('should transform fileName to the PascalCase', () => {
    expect(rename('camel-case.js')).toBe('CamelCase.js')
    expect(rename('camelCase.js')).toBe('CamelCase.js')
    expect(rename('camel_case.js')).toBe('CamelCase.js')
    expect(rename('camelcase.js')).toBe('Camelcase.js')
  })

  it('should change the extension to js', () => {
    const result = rename('camel-case.svg')
    expect(result).toBe('CamelCase.js')
  })
})
