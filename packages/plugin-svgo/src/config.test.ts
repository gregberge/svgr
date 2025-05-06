import { getSvgoConfig } from './config'

const state = { componentName: 'Icon' }

describe('#getSvgoConfig', () => {
  describe('with no specific config', () => {
    it('returns config with `prefixIds: true`', async () => {
      const config = {}
      expect(await getSvgoConfig(config, state)).toEqual({
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: {} },
          },
          'prefixIds',
        ],
      })
    })
  })
})
