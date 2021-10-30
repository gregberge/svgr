import * as path from 'path'
import { convertFile, transformFilename, formatExportName } from './util'

const FIXTURES = path.join(__dirname, '../../../__fixtures__')

describe('util', () => {
  describe('#convertFile', () => {
    it('should convert a file', async () => {
      const file = path.join(FIXTURES, 'simple/file.svg')
      const result = await convertFile(file)
      expect(result).toMatchSnapshot()
    })

    it('should support a custom config path', async () => {
      const file = path.join(FIXTURES, 'simple/file.svg')
      const result = await convertFile(file, {
        configFile: '__fixtures__/withSvgrRc/.svgrrc',
      })
      expect(result).toMatchSnapshot()
    })
  })

  describe('#transformFilename', () => {
    it('should transform filename', () => {
      expect(transformFilename('FooBar', 'camel')).toBe('fooBar')
      expect(transformFilename('FooBar', 'kebab')).toBe('foo-bar')
      expect(transformFilename('FooBar', 'pascal')).toBe('FooBar')

      expect(transformFilename('foo_bar', 'camel')).toBe('fooBar')
      expect(transformFilename('foo_bar', 'kebab')).toBe('foo-bar')
      expect(transformFilename('foo_bar', 'pascal')).toBe('FooBar')
    })
  })

  describe('#formatExportName', () => {
    it('should ensure a valid export name', () => {
      expect(formatExportName('foo')).toBe('Foo')
      expect(formatExportName('foo-bar')).toBe('FooBar')
      expect(formatExportName('2foo')).toBe('Svg2foo')
      expect(formatExportName('2foo-bar')).toBe('Svg2FooBar')
    })
  })
})
