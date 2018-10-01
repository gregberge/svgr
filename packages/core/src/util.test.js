import { getComponentName } from './util'

describe('util', () => {
  describe('#getComponentName', () => {
    it('should transform filePath into a component name', () => {
      expect(getComponentName({})).toBe('SvgComponent')
      expect(getComponentName({ filePath: 'hello.svg' })).toBe('SvgHello')
      expect(getComponentName({ filePath: 'hello-you.svg' })).toBe(
        'SvgHelloYou',
      )
      expect(getComponentName({ filePath: 'hello_you.svg' })).toBe(
        'SvgHelloYou',
      )
      expect(getComponentName({ filePath: '1_big_svg.svg' })).toBe('Svg1BigSvg')
    })
  })
})
