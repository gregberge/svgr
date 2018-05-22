import convert, {
  rawConvert,
  jsx,
  stripAttribute,
  expandProps,
  replaceAttrValue,
  wrapIntoComponent,
} from './'

describe('rawConvert', () => {
  it('should convert using specific options', async () => {
    const result = await rawConvert(
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
        template: wrapIntoComponent({ expandProps: true }),
      },
      { filePath: 'MyComponent.svg' },
    )

    expect(result).toMatchSnapshot()
  })
})

it('should handle componentName with only numbers', async () => {
  const result = await rawConvert(
    `<svg></svg>`,
    {
      h2x: {
        plugins: [jsx],
      },
      template: wrapIntoComponent({ expandProps: true }),
    },
    { filePath: '1_big_svg.svg' },
  )

  expect(result).toMatchSnapshot()
})

describe('convert', () => {
  it('should convert using config', async () => {
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
    )

    expect(result).toMatchSnapshot()
  })

  it('should remove style tags', async () => {
    const result = await convert(
      `
      <?xml version="1.0" encoding="UTF-8"?>
      <svg width="88px" height="88px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
          <title>Dismiss</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <style>
            #Blocks {
              fill: red;
            }
          </style>
          <g id="Blocks" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
              <g id="Dismiss" stroke="#063855" stroke-width="2">
                  <path d="M51,37 L37,51" id="Shape"></path>
                  <path d="M51,51 L37,37" id="Shape"></path>
              </g>
              <style>
                #Shape {}
              </style>
          </g>
      </svg>
    `,
    )

    expect(result).toMatchSnapshot()
  })

  it('should support react-native', async () => {
    const result = await convert(
      `
      <?xml version="1.0" encoding="UTF-8"?>
      <svg width="88px" height="88px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
          <title>Dismiss</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <style>
            #Blocks {
              fill: red;
            }
          </style>
          <g id="Blocks" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
              <g id="Dismiss" stroke="#063855" stroke-width="2">
                  <path d="M51,37 L37,51" id="Shape"></path>
                  <path d="M51,51 L37,37" id="Shape"></path>
              </g>
              <style>
                #Shape {}
              </style>
          </g>
      </svg>
    `,
      {},
    )

    expect(result).toMatchSnapshot()
  })

  it('should convert style attribute', async () => {
    const result = await convert(
      `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="48"
   height="48"
   id="svg2"
   version="1.1"
   inkscape:version="0.48.4 r9939"
   sodipodi:docname="list.inkscape.svg">
  <defs
     id="defs4" />
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="15.839192"
     inkscape:cx="25.129629"
     inkscape:cy="28.031549"
     inkscape:document-units="px"
     inkscape:current-layer="layer1"
     showgrid="true"
     inkscape:window-width="1920"
     inkscape:window-height="2050"
     inkscape:window-x="0"
     inkscape:window-y="55"
     inkscape:window-maximized="0">
    <inkscape:grid
       type="xygrid"
       id="grid2985"
       empspacing="4"
       visible="true"
       enabled="true"
       snapvisiblegridlinesonly="true"
       dotted="true" />
  </sodipodi:namedview>
  <metadata
     id="metadata7">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"
     transform="translate(0,-1004.3622)">
    <g
       id="g4238"
       transform="translate(0,1.7382813e-5)"
       inkscape:tile-cx="24"
       inkscape:tile-cy="42"
       inkscape:tile-w="40"
       inkscape:tile-h="4"
       inkscape:tile-x0="4"
       inkscape:tile-y0="40">
      <rect
         style="color:#000000;fill:#a3a3a3;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:8;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate"
         id="rect4240"
         width="4"
         height="4"
         x="4"
         y="1010.3622"
         rx="0.2"
         ry="0.2" />
      <rect
         ry="0.2"
         rx="0.2"
         y="1010.3622"
         x="12"
         height="4"
         width="32"
         id="rect4242"
         style="color:#000000;fill:#a3a3a3;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:8;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />
    </g>
    <use
       x="0"
       y="0"
       inkscape:tiled-clone-of="#g4238"
       xlink:href="#g4238"
       id="use4358" />
    <use
       x="0"
       y="0"
       inkscape:tiled-clone-of="#g4238"
       xlink:href="#g4238"
       transform="translate(0,8)"
       id="use4360" />
    <use
       x="0"
       y="0"
       inkscape:tiled-clone-of="#g4238"
       xlink:href="#g4238"
       transform="translate(0,16)"
       id="use4362" />
    <use
       x="0"
       y="0"
       inkscape:tiled-clone-of="#g4238"
       xlink:href="#g4238"
       transform="translate(0,24)"
       id="use4364" />
    <use
       x="0"
       y="0"
       inkscape:tiled-clone-of="#g4238"
       xlink:href="#g4238"
       transform="translate(0,32)"
       id="use4366" />
  </g>
</svg>`,
    )

    expect(result).toMatchSnapshot()
  })

  it('should accept initial state (for webpack)', async () => {
    const result = await convert(
      `<?xml version="1.0" encoding="UTF-8"?>
  <svg height="25" width="23">
    <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
  </svg>`,
      {},
      { webpack: { previousExport: '"path/to/svg.svg"' } },
    )

    expect(result).toMatchSnapshot()
  })

  describe('options', () => {
    it('keepUselessDefs', async () => {
      const svgWithUselessDefs = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="0" height="0" style="position:absolute">
  <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="filter">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </symbol>
</svg>`
      expect(await convert(svgWithUselessDefs)).toMatchSnapshot('default')
      expect(
        await convert(svgWithUselessDefs, { keepUselessDefs: true }),
      ).toMatchSnapshot('keepUselessDefs: true')
    })

    it('svgAttribute', async () => {
      const svg = `<svg><path d="M0 0h24v24H0z" fill="none" /></svg>`

      expect(
        await convert(svg, { svgAttribute: { focusable: false } }),
      ).toMatchSnapshot()
    });
    
    it('titleProp', async () => {
      const svg = `
      <svg width="0" height="0" style="position:absolute">
    <path d="M0 0h24v24H0z" fill="none" />
</svg>
`
      expect(await convert(svg, { titleProp: true })).toMatchSnapshot()
    })
  })
})
