import jsx from 'h2x-plugin-jsx'
import h2x from '../plugins/h2x'
import titleProp from './titleProp'

describe('titleProp', () => {
  it('should add title element to svg', () => {
    const result = h2x(
      `<svg>
          <path d="M51,37 L37,51" id="Shape"></path>
      </svg>
      `,
      { plugins: [jsx, titleProp] },
    )

    expect(result).toMatchSnapshot()
  })
  
  it('should remove old title and add the new title', () => {
    const result = h2x(
      `<svg>
          <title>Rectangle 5</title>
          <path d="M51,37 L37,51" id="Shape"></path>
      </svg>
      `,
      { plugins: [jsx, titleProp] },
    )

    expect(result).toMatchSnapshot()
  })
})
