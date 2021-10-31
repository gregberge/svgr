import * as path from 'path'
import { resolveConfig, resolveConfigFile, loadConfig } from './config'

const getMethod = (method: any, mode: string) =>
  mode === 'sync' ? method.sync : method

describe('svgo', () => {
  describe.each([['sync'], ['async']])('%s', (mode) => {
    describe(`#resolveConfig [${mode}]`, () => {
      it('should return null if no config found', async () => {
        const config = await getMethod(resolveConfig, mode)('/tmp')
        expect(config).toBe(null)
      })

      it('should return config if found', async () => {
        const config = await getMethod(
          resolveConfig,
          mode,
        )(path.join(__dirname, '__fixtures__/svgr'))
        expect(config).toEqual({
          icon: true,
          noSemi: true,
          replaceAttrValues: [['#063855', 'currentColor']],
        })
      })
    })

    describe(`#resolveConfigFile [${mode}]`, () => {
      it('should return null if no config found', async () => {
        const config = await getMethod(resolveConfigFile, mode)('/tmp')
        expect(config).toBe(null)
      })

      it('should return config path if found', async () => {
        const config = await getMethod(
          resolveConfigFile,
          mode,
        )(path.join(__dirname, '__fixtures__/svgr'))
        expect(config).toMatch(/__fixtures__(\/|\\)svgr(\/|\\)\.svgrrc$/)
      })
    })

    describe(`#loadConfig [${mode}]`, () => {
      it('should use default config without state.filePath', async () => {
        const config = await getMethod(loadConfig, mode)({ dimensions: false })
        expect(config).toMatchSnapshot()
      })

      it('should load config using filePath', async () => {
        const config = await getMethod(loadConfig, mode)(
          {},
          { filePath: path.join(__dirname, '__fixtures__/svgr/icon.svg') },
        )
        expect(config).toMatchSnapshot()
      })

      it('should not load config with "runtimeConfig: false', async () => {
        const config = await getMethod(loadConfig, mode)(
          { useRuntimeConfig: false },
          { filePath: path.join(__dirname, '__fixtures__/svgr/icon.svg') },
        )
        expect(config).toMatchSnapshot()
      })

      it('should work with custom config path', async () => {
        const config = await getMethod(loadConfig, mode)(
          { configFile: path.join(__dirname, '__fixtures__/svgr/.svgrrc') },
          { filePath: __dirname },
        )
        expect(config).toMatchSnapshot()
      })
    })
  })
})
