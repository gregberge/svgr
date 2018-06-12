import path from 'path'
import { resolveConfig, resolveConfigFile } from './config'

describe('config', () => {
  describe('#resolveConfig', () => {
    it('should return null if no config found', async () => {
      const config = await resolveConfig('/tmp')
      expect(config).toBe(null)
    })

    it('should return config if found', async () => {
      const config = await resolveConfig(
        path.join(__dirname, '__fixtures__/svgr'),
      )
      expect(config).toEqual({
        icon: true,
        noSemi: true,
        replaceAttrValues: [['#063855', 'currentColor']],
      })
    })
  })

  describe('#resolveConfigFile', () => {
    it('should return null if no config found', async () => {
      const config = await resolveConfigFile('/tmp')
      expect(config).toBe(null)
    })

    it('should return config path if found', async () => {
      const config = await resolveConfigFile(
        path.join(__dirname, '__fixtures__/svgr'),
      )
      expect(config).toMatch(/__fixtures__\/svgr\/\.svgrrc$/)
    })
  })
})
