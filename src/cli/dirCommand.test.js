import { rename } from './dirCommand'

describe('rename', () => {
  it('should transform fileName to the PascalCase', async () => {
    const result = rename('camel-case.js')
    expect(result).toBe('CamelCase.js')
  })

  it('should change the extension to js', async () => {
    const result = rename('camel-case.svg')
    expect(result).toBe('CamelCase.js')
  })
})
