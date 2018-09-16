import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import svgProps from './svgProps'

function transformSvgProps(code, props) {
  return transform(code, { plugins: [jsx, svgProps(props)] })
}

describe('svgProps', () => {
  it('should add one prop to svg', () => {
    expect(
      transformSvgProps(
        ` <svg>
            <g stroke="#063855" stroke-width="2">
              <path d="M51,37 L37,51"></path>
            </g>
          </svg>
        `,
        { focusable: false },
      ),
    ).toMatchInlineSnapshot(`
"<svg focusable=\\"false\\">
  <g stroke=\\"#063855\\" strokeWidth={2}>
    <path d=\\"M51,37 L37,51\\" />
  </g>
</svg>
"
`)
  })

  it('should add multiple props to svg', () => {
    expect(
      transformSvgProps(
        ` <svg>
            <g stroke="#063855" stroke-width="2">
              <path d="M51,37 L37,51"></path>
            </g>
          </svg>
        `,
        {
          focusable: false,
          hidden: 'hidden',
        },
      ),
    ).toMatchInlineSnapshot(`
"<svg focusable=\\"false\\" hidden=\\"hidden\\">
  <g stroke=\\"#063855\\" strokeWidth={2}>
    <path d=\\"M51,37 L37,51\\" />
  </g>
</svg>
"
`)
  })

  it('should update old prop to the new prop', () => {
    expect(
      transformSvgProps(
        ` <svg focusable="false">
            <g stroke="#063855" stroke-width="2">
              <path d="M51,37 L37,51"></path>
            </g>
          </svg>
        `,
        { focusable: true },
      ),
    ).toMatchInlineSnapshot(`
"<svg focusable=\\"true\\">
  <g stroke=\\"#063855\\" strokeWidth={2}>
    <path d=\\"M51,37 L37,51\\" />
  </g>
</svg>
"
`)
  })

  it('should add a new prop', () => {
    expect(
      transformSvgProps(
        ` <svg focusable="true" color="#fff">
            <g stroke="#063855" stroke-width="2">
              <path d="M51,37 L37,51"></path>
            </g>
          </svg>
        `,
        { focusable: true, hidden: true },
      ),
    ).toMatchInlineSnapshot(`
"<svg focusable=\\"true\\" hidden=\\"true\\" color=\\"#fff\\">
  <g stroke=\\"#063855\\" strokeWidth={2}>
    <path d=\\"M51,37 L37,51\\" />
  </g>
</svg>
"
`)
  })

  it('should interpolate prop with curly brackets', () => {
    expect(
      transformSvgProps(
        ` <svg focusable="true" color="#fff">
            <g stroke="#063855" stroke-width="2">
              <path d="M51,37 L37,51"></path>
            </g>
          </svg>
        `,
        {
          // literal
          focusable: `{true}`,
          // variables
          hidden: `{hidden}`,
          // expression
          fill: `{fill == null ? 'currentColor' : fill}`,
          // string
          id: 'foo',
        },
      ),
    ).toMatchInlineSnapshot(`
"<svg focusable={true} hidden={hidden} fill={fill == null ? 'currentColor' : fill} id=\\"foo\\" color=\\"#fff\\">
  <g stroke=\\"#063855\\" strokeWidth={2}>
    <path d=\\"M51,37 L37,51\\" />
  </g>
</svg>
"
`)
  })
})
