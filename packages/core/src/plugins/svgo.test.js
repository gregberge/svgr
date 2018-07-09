import path from 'path'
import svgo from './svgo'

const baseSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="88px" height="88px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
  <title>Dismiss</title>
  <desc>Created with Sketch.</desc>
  <defs></defs>
  <g id="Blocks" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
      <g id="Dismiss" stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
          <path d="M51,51 L37,37" id="Shape"></path>
      </g>
  </g>
</svg>`

describe('svgo', () => {
  it('should optimize svg', async () => {
    const result = await svgo(baseSvg, { svgo: true })

    expect(result).toMatchSnapshot()
  })

  it('should support config.svgoConfig', async () => {
    const result = await svgo(baseSvg, {
      svgo: true,
      svgoConfig: { plugins: [{ removeDesc: false }] },
    })

    expect(result).toMatchSnapshot()
  })

  it('should support icon with config.svgoConfig plugins', async () => {
    const result = await svgo(baseSvg, {
      svgo: true,
      icon: true,
      svgoConfig: { plugins: [{ removeDesc: false }] },
    })

    expect(result).toMatchSnapshot()
  })

  it('should use state.filePath to detect configuration', async () => {
    const result = await svgo(
      baseSvg,
      { svgo: true },
      { filePath: path.join(__dirname, '../__fixtures__/svgo') },
    )

    expect(result).toMatchSnapshot()
  })

  it('should not remove viewBox with icon option', async () => {
    const result = await svgo(
      baseSvg,
      { icon: true },
      { filePath: path.join(__dirname, '../__fixtures__/svgo') },
    )

    expect(result).toMatchSnapshot()
  })
})
