import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import stripAttribute from './stripAttribute'

describe('stripAttribute', () => {
  it('should remove an attribute', () => {
    const result = transform(
      `
      <svg>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, stripAttribute('id')] },
    )

    expect(result).toMatchSnapshot()
  })
})
