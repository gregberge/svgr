import svgo from './svgo'

describe('svgo', () => {
  it('should optimize svg', async () => {
    const result = await svgo(`<?xml version="1.0" encoding="UTF-8"?>
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
    </svg>`)

    expect(result).toBe(
      '<svg width="88" height="88" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg"><title>Dismiss</title><g stroke="#063855" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="square"><path d="M51 37L37 51M51 51L37 37"/></g></svg>',
    )
  })

  it('should support options', async () => {
    const result = await svgo(
      `<?xml version="1.0" encoding="UTF-8"?>
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
    </svg>`,
      { plugins: [{ removeDesc: false }] },
    )

    expect(result).toBe(
      '<svg width="88" height="88" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg"><title>Dismiss</title><desc>Created with Sketch.</desc><g stroke="#063855" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="square"><path d="M51 37L37 51M51 51L37 37"/></g></svg>',
    )
  })
})
