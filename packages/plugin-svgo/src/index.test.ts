import * as path from 'path'
import svgo from '.'

const state = { componentName: 'SvgComponent' }

const baseSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="88px" height="88px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
  <title>Dismiss</title>
  <desc>Created with Sketch.</desc>
  <defs></defs>
  <style>.shape{fill: red}</style>
  <g id="Blocks" class="blocks" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
      <g id="Dismiss" stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape" class="shape"></path>
          <path d="M51,51 L37,37" id="Shape" class="shape"></path>
          <style>
            #Shape {}
          </style>
      </g>
  </g>
</svg>`

describe('svgo', () => {
  it('optimizes svg', () => {
    const result = svgo(baseSvg, { svgo: true, runtimeConfig: true }, state)
    expect(result).toMatchSnapshot()
  })

  it('supports `config.svgoConfig`', () => {
    const result = svgo(
      baseSvg,
      {
        svgo: true,
        runtimeConfig: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeDesc: false,
                },
              },
            },
          ],
        },
      },
      state,
    )
    expect(result).toMatchSnapshot()
  })

  it('throws error on invalid svg input', () => {
    const errorSvg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="88px" height="88px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path d=M51,37 L37,51" id="Shape" class="shape"></path>
  </svg>`

    expect(() =>
      svgo(
        errorSvg,
        { svgo: true, runtimeConfig: true },
        { ...state, filePath: path.join(__dirname, '../__fixtures__/svgo') },
      ),
    ).toThrowError()
  })

  it('uses `state.filePath` to detect configuration', () => {
    const result = svgo(
      baseSvg,
      { svgo: true, runtimeConfig: true },
      { ...state, filePath: path.join(__dirname, '../__fixtures__/svgo') },
    )

    expect(result).toMatchSnapshot()
  })

  it('does not load runtime configuration with `runtimeConfig: false`', () => {
    const result = svgo(
      baseSvg,
      { svgo: true, runtimeConfig: false },
      { ...state, filePath: path.join(__dirname, '../__fixtures__/svgo') },
    )
    expect(result).toMatchSnapshot()
  })

  it('does not remove viewBox with `icon` option', () => {
    const result = svgo(baseSvg, { svgo: true, icon: true }, state)
    expect(result).toMatchSnapshot()
  })

  it('does not remove viewBox with when `dimensions` is false', () => {
    const result = svgo(baseSvg, { svgo: true, dimensions: false }, state)
    expect(result).toMatchSnapshot()
  })

  it('does remove style when `native` is true', () => {
    const result = svgo(baseSvg, { svgo: true, native: true }, state)
    expect(result).toMatchSnapshot()
  })
})
