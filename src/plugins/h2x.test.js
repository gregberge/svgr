import jsx from 'h2x-plugin-jsx'
import h2x from './h2x'

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
      { plugins: [jsx] },
    )

    expect(result.trim()).toBe(`<svg>
  <g stroke="#063855" strokeWidth={2}>
    <path d="M51,37 L37,51" id="Shape" />
  </g>
</svg>`)
  })
})
