import convert from '.'

const svgBaseCode = `
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
`

describe('convert', () => {
  it.only('should convert', async () => {
    const result = await convert(svgBaseCode)
    expect(result).toMatchSnapshot()
  })

  it('should work synchronously', async () => {
    const syncResult = convert.sync(svgBaseCode)
    const asyncResult = await convert(svgBaseCode)
    expect(syncResult).toEqual(asyncResult)
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

  it('should not remove all style tags', async () => {
    const result = await convert(
      `
      <?xml version="1.0" encoding="UTF-8"?>
      <svg width="88px" height="88px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
          <title>Dismiss</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <style>
            path {
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

  it('should handle special SVG attributes', async () => {
    const result = await convert(
      `
      <svg xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="100" height="100" externalResourcesRequired="false" />
      </svg>
    `,
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

  it('should remove null characters', async () => {
    const result = await convert(
      `<!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In  -->
<svg version="1.1"
	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
	 x="0px" y="0px" width="25px" height="25px" viewBox="0 0 25 25" style="enable-background:new 0 0 25 25;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#FFFFFF;stroke:#434A54;stroke-miterlimit:10;}
</style>
<defs>
</defs>
<path class="st0" d="M19.4,24.5H5.6c-2.8,0-5.1-2.3-5.1-5.1V5.6c0-2.8,2.3-5.1,5.1-5.1h13.8c2.8,0,5.1,2.3,5.1,5.1v13.8
	C24.5,22.2,22.2,24.5,19.4,24.5z"/>
</svg>
\0`,
    )

    expect(result).toMatchSnapshot()
    expect(result).not.toContain('\0')
  })

  describe('config', () => {
    const configs = [
      [{ dimensions: false }],
      [{ expandProps: false }],
      [{ expandProps: 'start' }],
      [{ icon: true }],
      [{ native: true }],
      [{ native: true, icon: true }],
      [{ native: true, expandProps: false }],
      [{ native: true, ref: true }],
      [{ ref: true }],
      [{ replaceAttrValues: { none: 'black' } }],
      [{ svgo: false }],
      [{ prettier: false }],
      [{ template: () => 'nothing' }],
      [{ titleProp: true }],
    ]

    test.each(configs)('should support options %o', async config => {
      const result = await convert(svgBaseCode, config)
      expect(result).toMatchSnapshot()
    })

    it('titleProp: without title added', async () => {
      const svg = `
      <svg width="0" height="0" style="position:absolute">
    <path d="M0 0h24v24H0z" fill="none" />
</svg>
`
      expect(await convert(svg, { titleProp: true })).toMatchSnapshot()
    })
  })
})
