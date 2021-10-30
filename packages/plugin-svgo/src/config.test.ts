import { getSvgoConfig } from './config'

describe('#getSvgoConfig', () => {
  describe('with no specific config', () => {
    it('returns config with `prefixIds: true`', async () => {
      const config = {}
      const state = {}
      expect(await getSvgoConfig(config, state)).toEqual({
        plugins: ['preset-default', 'prefixIds'],
      })
    })
  })

  describe('with `config.icons` enabled', () => {
    it('returns config with `removeViewBox: false`', async () => {
      const config = { icon: true }
      const state = {}
      expect(await getSvgoConfig(config, state)).toEqual({
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false } },
          },
          'prefixIds',
        ],
      })
    })
  })

  describe('with `config.dimensions` disabled', () => {
    it('returns config with `removeViewBox: false`', async () => {
      const config = { dimensions: false }
      const state = {}
      expect(await getSvgoConfig(config, state)).toEqual({
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false } },
          },
          'prefixIds',
        ],
      })
    })
  })
})
