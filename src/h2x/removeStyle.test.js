import jsx from 'h2x-plugin-jsx'
import h2x from '../plugins/h2x'
import removeStyle from './removeStyle'

describe('removeStyle', () => {
  it('should remove style elements', () => {
    const result = h2x(
      `
      <svg>
        <style></style>
        <style></style>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, removeStyle] },
    )

    expect(result.trim()).toBe(`<svg>
  <g stroke="#063855" strokeWidth={2}>
    <path d="M51,37 L37,51" id="Shape" />
  </g>
</svg>`)
  })
})
