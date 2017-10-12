import { pascalCase } from './rename'

describe('pascalCase', () => {
  it('should transform fileName to the PascalCase', async () => {
    expect(pascalCase('camel-case')).toBe('CamelCase')
    expect(pascalCase('camel_case')).toBe('CamelCase')
    expect(pascalCase('camelCase')).toBe('CamelCase')
    expect(pascalCase('camel--Case')).toBe('CamelCase')
    expect(pascalCase('camel_case')).toBe('CamelCase')
  })
})
