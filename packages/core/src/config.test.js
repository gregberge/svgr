import path from 'path'
import { resolveConfig, resolveConfigFile, loadConfig } from './config'

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
      expect(config).toMatch(/__fixtures__(\/|\\)svgr(\/|\\)\.svgrrc$/)
    })
  })

  describe('#loadConfig', () => {
    it('should use default config without state.filePath', async () => {
      const config = await loadConfig({ dimensions: false })
      expect(config).toMatchInlineSnapshot(`
Object {
  "dimensions": false,
  "expandProps": "end",
  "h2xConfig": null,
  "icon": false,
  "native": false,
  "prettier": true,
  "prettierConfig": null,
  "ref": false,
  "replaceAttrValues": null,
  "runtimeConfig": true,
  "svgProps": null,
  "svgo": true,
  "svgoConfig": null,
  "template": null,
  "titleProp": false,
}
`)
    })

    it('should load config using filePath', async () => {
      const config = await loadConfig(
        {},
        { filePath: path.join(__dirname, '__fixtures__/svgr/icon.svg') },
      )
      expect(config).toMatchInlineSnapshot(`
Object {
  "dimensions": true,
  "expandProps": "end",
  "h2xConfig": null,
  "icon": true,
  "native": false,
  "noSemi": true,
  "prettier": true,
  "prettierConfig": null,
  "ref": false,
  "replaceAttrValues": Array [
    Array [
      "#063855",
      "currentColor",
    ],
  ],
  "runtimeConfig": true,
  "svgProps": null,
  "svgo": true,
  "svgoConfig": null,
  "template": null,
  "titleProp": false,
}
`)
    })

    it('should not load config with "runtimeConfig: false', async () => {
      const config = await loadConfig(
        { useRuntimeConfig: false },
        { filePath: path.join(__dirname, '__fixtures__/svgr/icon.svg') },
      )
      expect(config).toMatchInlineSnapshot(`
Object {
  "dimensions": true,
  "expandProps": "end",
  "h2xConfig": null,
  "icon": true,
  "native": false,
  "noSemi": true,
  "prettier": true,
  "prettierConfig": null,
  "ref": false,
  "replaceAttrValues": Array [
    Array [
      "#063855",
      "currentColor",
    ],
  ],
  "runtimeConfig": true,
  "svgProps": null,
  "svgo": true,
  "svgoConfig": null,
  "template": null,
  "titleProp": false,
  "useRuntimeConfig": false,
}
`)
    })

    it('should work with custom config path', async () => {
      const config = await loadConfig(
        { configFile: path.join(__dirname, '__fixtures__/svgr/.svgrrc') },
        { filePath: __dirname },
      )
      expect(config).toMatchInlineSnapshot(`
Object {
  "dimensions": true,
  "expandProps": "end",
  "h2xConfig": null,
  "icon": true,
  "native": false,
  "noSemi": true,
  "prettier": true,
  "prettierConfig": null,
  "ref": false,
  "replaceAttrValues": Array [
    Array [
      "#063855",
      "currentColor",
    ],
  ],
  "runtimeConfig": true,
  "svgProps": null,
  "svgo": true,
  "svgoConfig": null,
  "template": null,
  "titleProp": false,
}
`)
    })
  })
})
