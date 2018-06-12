import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import removeComments from './removeComments'

describe('removeComments', () => {
  it('should remove comments', () => {
    const result = transform(
      `<svg>
        <!-- Comment -->
        <g stroke="#063855" stroke-width="2" />
      </svg>`,
      { plugins: [jsx, removeComments()] },
    )

    expect(result).toMatchSnapshot()
  })
})
