import { pascalCase, getComponentName } from './util'

describe('util', () => {
  describe('#pascalCase', () => {
    it('should transform fileName to the PascalCase', () => {
      expect(pascalCase('camel-case')).toBe('CamelCase')
      expect(pascalCase('camel_case')).toBe('CamelCase')
      expect(pascalCase('camelCase')).toBe('CamelCase')
      expect(pascalCase('camel--Case')).toBe('CamelCase')
      expect(pascalCase('camel_case')).toBe('CamelCase')
    })
  })

  describe('#getComponentName', () => {
    it('should transform filePath into a component name', () => {
      expect(getComponentName({})).toBe('SvgComponent')
      expect(getComponentName({ filePath: 'hello.svg' })).toBe('Hello')
      expect(getComponentName({ filePath: 'hello-you.svg' })).toBe('HelloYou')
      expect(getComponentName({ filePath: 'hello_you.svg' })).toBe('HelloYou')
      expect(getComponentName({ filePath: '1_big_svg.svg' })).toBe('Svg1BigSvg')
    })
  })
})
