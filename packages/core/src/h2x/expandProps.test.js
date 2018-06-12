import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import expandProps from './expandProps'

describe('expandProps', () => {
  it('should expand props', () => {
    const result = transform(
      `<svg>
        <g stroke="#063855" stroke-width="2" />
      </svg>`,
      { plugins: [jsx, expandProps()] },
    )

    expect(result).toMatchSnapshot()
  })
})
