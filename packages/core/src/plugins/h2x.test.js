import jsx from 'h2x-plugin-jsx'
import h2x from './h2x'
import stripAttribute from '../h2x/stripAttribute'

describe('h2x', () => {
  it('should take svg and convert it to jsx', () => {
    const result = h2x(
      `
      <svg>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
    )

    expect(result).toMatchSnapshot()
  })

  it('should support config.h2xConfig', () => {
    const result = h2x(
      `
      <svg>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { h2xConfig: { plugins: [jsx, stripAttribute('id')] } },
    )

    expect(result).toMatchSnapshot()
  })
})
