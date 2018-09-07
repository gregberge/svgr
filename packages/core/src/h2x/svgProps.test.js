import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import svgProps from './svgProps'

describe('svgProps', () => {
  it('should add one prop to svg', () => {
    const props = { focusable: false }
    const result = transform(
      `
      <svg>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, svgProps(props)] },
    )

    expect(result).toMatchSnapshot()
  })

  it('should add multiple props to svg', () => {
    const props = {
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
      { plugins: [jsx, svgProps(props)] },
    )

    expect(result).toMatchSnapshot()
  })

  it('should update old prop to the new prop', () => {
    const props = { focusable: true }
    const result = transform(
      `<svg focusable="false">
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, svgProps(props)] },
    )

    expect(result).toMatchSnapshot()
  })

  it('should add a new prop', () => {
    const props = {
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
      { plugins: [jsx, svgProps(props)] },
    )

    expect(result).toMatchSnapshot()
  })
})
