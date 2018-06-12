import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import removeDimensions from './removeDimensions'

describe('removeDimensions', () => {
  it('should remove width and height', () => {
    const result = transform(
      `<svg width="20" height="20">
        <g stroke="#063855" stroke-width="2" />
      </svg>`,
      { plugins: [jsx, removeDimensions()] },
    )

    expect(result).toMatchSnapshot()
  })
})
