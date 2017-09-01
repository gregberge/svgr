import jsx from 'h2x-plugin-jsx'
import stripAttribute from './h2x/stripAttribute'
import expandProps from './h2x/expandProps'
import replaceAttrValue from './h2x/replaceAttrValue'
import convert from './'

describe('convert', () => {
  it('should convert', async () => {
    const result = await convert(
      `
      <?xml version="1.0" encoding="UTF-8"?>
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
      </svg>
    `,
      null,
      { filePath: 'MyComponent.js' },
    )

    expect(result).toMatchSnapshot()
  })

  it('should be possible to specify options', async () => {
    const result = await convert(
      `
      <?xml version="1.0" encoding="UTF-8"?>
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
      </svg>
    `,
      {
        h2x: {
          plugins: [
            jsx,
            stripAttribute('xmlns'),
            expandProps,
            replaceAttrValue('#063855', 'currentColor'),
          ],
        },
      },
      { filePath: 'MyComponent.js' },
    )

    expect(result).toMatchSnapshot()
  })
})
