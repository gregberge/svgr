import path from 'path'
import { convertFile } from './util'

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
        config: '__fixtures__/withSvgrRc/.svgrrc',
      })
      expect(result).toMatchSnapshot()
    })
  })
})
