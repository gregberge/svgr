import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import removeStyle from './removeStyle'

describe('removeStyle', () => {
  it('should remove style elements', () => {
    const result = transform(
      `
      <svg>
        <style></style>
        <style></style>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, removeStyle()] },
    )

    expect(result).toMatchSnapshot()
  })
})
