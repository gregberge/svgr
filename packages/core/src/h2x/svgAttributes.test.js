import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import svgAttributes from './svgAttributes'

describe('svgAttributes', () => {
  it('should add one attribute to svg', () => {
    const attrs = { focusable: false }
    const result = transform(
      `
      <svg>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, svgAttributes(attrs)] },
    )

    expect(result).toMatchSnapshot()
  })

  it('should add multiple attributes to svg', () => {
    const attrs = {
      focusable: false,
      hidden: 'hidden',
    }
    const result = transform(
      `<svg>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, svgAttributes(attrs)] },
    )

    expect(result).toMatchSnapshot()
  })

  it('should update old attribute to the new attribute', () => {
    const attrs = { focusable: true }
    const result = transform(
      `<svg focusable="false">
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, svgAttributes(attrs)] },
    )

    expect(result).toMatchSnapshot()
  })

  it('should add a new attribute', () => {
    const attrs = {
      focusable: true,
      hidden: true,
    }
    const result = transform(
      `<svg focusable="true" color="#fff">
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, svgAttributes(attrs)] },
    )

    expect(result).toMatchSnapshot()
  })
})
