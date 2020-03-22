import { getFilePath, getBaseSvgoConfig, mergeSvgoConfig } from './config'

describe('svgo config', () => {
  describe('#getFilePath', () => {
    describe('if `state.filePath` exists', () => {
      it('returns `state.filePath', () => {
        expect(getFilePath({ filePath: '/foo/bar' })).toBe('/foo/bar')
      })
    })
    describe('if `state.filePath` does not exists', () => {
      it('returns current working directory', () => {
        expect(getFilePath({})).toBe(process.cwd())
      })
    })
  })

  describe('#getBaseSvgoConfig', () => {
    describe('with no specific config', () => {
      it('returns config with `prefixIds: true`', () => {
        expect(getBaseSvgoConfig({})).toEqual({
          plugins: [{ prefixIds: true }],
        })
      })
    })

    describe('with `config.icons` enabled', () => {
      it('returns config with `removeViewBox: false`', () => {
        expect(getBaseSvgoConfig({ icon: true })).toEqual({
          plugins: [{ prefixIds: true }, { removeViewBox: false }],
        })
      })
    })

    describe('with `config.dimensions` disabled', () => {
      it('returns config with `removeViewBox: false`', () => {
        expect(getBaseSvgoConfig({ dimensions: false })).toEqual({
          plugins: [{ prefixIds: true }, { removeViewBox: false }],
        })
      })
    })
  })

  describe('#mergeSvgoConfig', () => {
    it('merges any config format', () => {
      expect(mergeSvgoConfig({ foo: 'bar' }, { foo: 'rab' })).toEqual({
        foo: 'rab',
        plugins: [],
      })
      expect(
        mergeSvgoConfig({ plugins: { removeViewBox: false } }, null),
      ).toEqual({
        plugins: [{ removeViewBox: false }],
      })
      expect(
        mergeSvgoConfig({ plugins: { removeViewBox: false } }, {}),
      ).toEqual({
        plugins: [{ removeViewBox: false }],
      })
      expect(mergeSvgoConfig({ plugins: { removeViewBox: false } })).toEqual({
        plugins: [{ removeViewBox: false }],
      })
      expect(mergeSvgoConfig({ plugins: [{ removeViewBox: false }] })).toEqual({
        plugins: [{ removeViewBox: false }],
      })
      expect(
        mergeSvgoConfig({
          plugins: [{ removeViewBox: false }, { removeViewBox: true }],
        }),
      ).toEqual({
        plugins: [{ removeViewBox: true }],
      })
      expect(
        mergeSvgoConfig({
          plugins: [
            {
              convertColors: {
                currentColor: true,
              },
            },
            {
              prefixIds: {
                prefix: 'foo',
              },
            },
          ],
        }),
      ).toEqual({
        plugins: [
          {
            convertColors: {
              currentColor: true,
            },
          },
          {
            prefixIds: {
              prefix: 'foo',
            },
          },
        ],
      })
      expect(
        mergeSvgoConfig(
          {
            plugins: [
              {
                prefixIds: {
                  prefix: 'foo',
                },
              },
            ],
          },
          {
            plugins: [
              {
                prefixIds: {
                  prefix: 'bar',
                },
              },
            ],
          },
        ),
      ).toEqual({
        plugins: [
          {
            prefixIds: {
              prefix: 'bar',
            },
          },
        ],
      })
    })
  })
})
