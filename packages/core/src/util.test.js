import { getComponentName } from './util'

describe('util', () => {
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
