import { rename } from './dirCommand'

describe('rename', () => {
  it('should transform fileName to the PascalCase', () => {
    expect(rename('camel-case.js')).toBe('CamelCase.js')
    expect(rename('camelCase.js')).toBe('CamelCase.js')
    expect(rename('camel_case.js')).toBe('CamelCase.js')
    expect(rename('camelcase.js')).toBe('Camelcase.js')
  })

  it('should change the extension to js by default', () => {
    const result = rename('camel-case.svg')
    expect(result).toBe('CamelCase.js')
  })

  it('should change the extension to whatever is configured', () => {
    const result = rename('camel-case.svg', { ext: 'tsx' })
    expect(result).toBe('CamelCase.tsx')
  })
})
