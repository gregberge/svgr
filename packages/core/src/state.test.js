import { expandState } from './state'

describe('state', () => {
  describe('#expandState', () => {
    it('should transform filePath into a component name', () => {
      expect(expandState({})).toEqual({ componentName: 'SvgComponent' })
      expect(expandState({ filePath: 'hello.svg' })).toEqual({
        filePath: 'hello.svg',
        componentName: 'SvgHello',
      })
      expect(expandState({ filePath: 'hello-you.svg' })).toEqual({
        filePath: 'hello-you.svg',
        componentName: 'SvgHelloYou',
      })
      expect(expandState({ filePath: 'hello_you.svg' })).toEqual({
        filePath: 'hello_you.svg',
        componentName: 'SvgHelloYou',
      })
      expect(expandState({ filePath: '1_big_svg.svg' })).toEqual({
        filePath: '1_big_svg.svg',
        componentName: 'Svg1BigSvg',
      })
    })
  })
})
