import path from 'path'
import { convertFile, transformFilename, CASE } from './util'

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
      expect(transformFilename('FooBar', CASE.CAMEL)).toBe('fooBar')
      expect(transformFilename('FooBar', CASE.KEBAB)).toBe('foo-bar')
      expect(transformFilename('FooBar', CASE.PASCAL)).toBe('FooBar')

      expect(transformFilename('foo_bar', CASE.CAMEL)).toBe('fooBar')
      expect(transformFilename('foo_bar', CASE.KEBAB)).toBe('foo-bar')
      expect(transformFilename('foo_bar', CASE.PASCAL)).toBe('FooBar')
    })
  })
})
