import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import replaceAttrValues from './replaceAttrValues'

describe('replaceAttrValues', () => {
  it('should replace an attribute value by another', () => {
    const result = transform(
      `
      <svg>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, replaceAttrValues({ '#063855': 'currentColor' })] },
    )

    expect(result).toMatchSnapshot()
  })
})
