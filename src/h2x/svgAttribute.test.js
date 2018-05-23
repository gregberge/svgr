import jsx from 'h2x-plugin-jsx'
import h2x from '../plugins/h2x'
import svgAttribute from './svgAttribute'

describe('svgAttribute', () => {
  it('should add one attribute to svg', () => {
    const attrs = { focusable: false }
    const result = h2x(
      `
      <svg>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, svgAttribute(attrs)] },
    )

    expect(result.trim()).toBe(`<svg focusable="false">
  <g stroke="#063855" strokeWidth={2}>
    <path d="M51,37 L37,51" id="Shape" />
  </g>
</svg>`)
  })

  it('should add multiple attributes to svg', () => {
    const attrs = {
      focusable: false,
      hidden: 'hidden',
    }
    const result = h2x(
      `<svg>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, svgAttribute(attrs)] },
    )

    expect(result.trim()).toBe(`<svg focusable="false" hidden="hidden">
  <g stroke="#063855" strokeWidth={2}>
    <path d="M51,37 L37,51" id="Shape" />
  </g>
</svg>`)
  })

  it('should update old attribute to the new attribute', () => {
    const attrs = { focusable: true }
    const result = h2x(
      `<svg focusable="false">
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, svgAttribute(attrs)] },
    )

    expect(result.trim()).toBe(`<svg focusable="true">
  <g stroke="#063855" strokeWidth={2}>
    <path d="M51,37 L37,51" id="Shape" />
  </g>
</svg>`)
  })

  it('should add a new attribute', () => {
    const attrs = {
      focusable: true,
      hidden: true,
    }
    const result = h2x(
      `<svg focusable="true" color="#fff">
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, svgAttribute(attrs)] },
    )

    expect(result.trim())
      .toBe(`<svg focusable="true" hidden="true" color="#fff">
  <g stroke="#063855" strokeWidth={2}>
    <path d="M51,37 L37,51" id="Shape" />
  </g>
</svg>`)
  })
})
