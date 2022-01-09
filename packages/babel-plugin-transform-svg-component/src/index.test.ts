import { transform } from '@babel/core'
import plugin, { Options } from '.'

const defaultOptions = {
  namedExport: 'ReactComponent',
  state: { componentName: 'SvgComponent' },
}

const testPlugin =
  (language: string) =>
  (code: string, options: Partial<Options> = {}) => {
    const result = transform(code, {
      plugins: [
        '@babel/plugin-syntax-jsx',
        [
          plugin,
          {
            typescript: language === 'typescript',
            ...defaultOptions,
            ...options,
          },
        ],
      ],
      configFile: false,
    })

    if (!result) {
      throw new Error(`No result`)
    }

    return result
  }

describe('plugin', () => {
  describe.each(['javascript', 'typescript'])('%s', (language) => {
    it('transforms whole program', () => {
      const { code } = testPlugin(language)('<svg><g /></svg>')
      expect(code).toMatchSnapshot()
    })

    describe('with "native" option', () => {
      it('adds import from "react-native-svg"', () => {
        const { code } = testPlugin(language)('<Svg><g /></Svg>', {
          native: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "ref" option', () => {
      it('adds ForwardRef component', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          ref: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "titleProp"', () => {
      it('adds "titleProp" and "titleId" prop', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          titleProp: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "titleProp" and "expandProps"', () => {
      it('adds "titleProp", "titleId" props and expands props', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          ...defaultOptions,
          expandProps: true,
          titleProp: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "expandProps"', () => {
      it('add props', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          ...defaultOptions,
          state: { componentName: 'SvgComponent' },
          expandProps: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "ref" and "expandProps" option', () => {
      it('expands props', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          state: { componentName: 'SvgComponent' },
          expandProps: true,
          ref: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "native", "ref" option', () => {
      it('adds import from "react-native-svg" and adds ForwardRef component', () => {
        const { code } = testPlugin(language)('<Svg><g /></Svg>', {
          state: { componentName: 'SvgComponent' },
          native: true,
          ref: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "native" and "expandProps" option', () => {
      it('adds import from "react-native-svg" and adds props', () => {
        const { code } = testPlugin(language)('<Svg><g /></Svg>', {
          state: { componentName: 'SvgComponent' },
          native: true,
          expandProps: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "native", "ref" and "expandProps" option', () => {
      it('adds import from "react-native-svg" and adds props and adds ForwardRef component', () => {
        const { code } = testPlugin(language)('<Svg><g /></Svg>', {
          state: { componentName: 'SvgComponent' },
          native: true,
          expandProps: true,
          ref: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "memo" option', () => {
      it('wrap component in "React.memo"', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          state: { componentName: 'SvgComponent' },
          memo: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with both "memo" and "ref" option', () => {
      it('wrap component in "React.memo" and "React.forwardRef"', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          state: { componentName: 'SvgComponent' },
          memo: true,
          ref: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "namedExport" option and "previousExport" state', () => {
      it('has custom named export', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          state: {
            componentName: 'SvgComponent',
            caller: {
              previousExport: `var img = new Image(); img.src = '...'; export default img;`,
            },
          },
          namedExport: 'Component',
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "namedExport" and "exportType" option and without "previousExport" state', () => {
      it('exports via named export', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          state: {
            componentName: 'SvgComponent',
            caller: { previousExport: null },
          },
          namedExport: 'ReactComponent',
          exportType: 'named',
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('custom templates', () => {
      it('support basic template', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          template: ({ jsx }, { tpl }) => tpl`import * as React from 'react';
          const MyComponent = () => ${jsx}
          export default MyComponent
        `,
          state: { componentName: 'SvgComponent' },
        })
        expect(code).toMatchSnapshot()
      })

      it('supports JSX template', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          template: ({ jsx }, { tpl }) => {
            return tpl`import * as React from 'react';
            const MyComponent = () => <main>{${jsx}}</main>
            export default MyComponent
          `
          },
          state: { componentName: 'SvgComponent' },
        })
        expect(code).toMatchSnapshot()
      })

      it('supports TypeScript template', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          template: ({ jsx }, { tpl }) => {
            return tpl`
              import * as React from 'react';
              const MyComponent = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
              export default MyComponent;
            `
          },
          typescript: true,
          state: { componentName: 'SvgComponent' },
        })
        expect(code).toMatchSnapshot()
      })

      it('supports template that does not return an array', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          template: ({ jsx }, { tpl }) => tpl`${jsx}`,
          state: { componentName: 'SvgComponent' },
        })
        expect(code).toMatchSnapshot()
      })

      it('supports type annotation on component', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          typescript: true,
          template: (
            { jsx, imports, interfaces, componentName, exports },
            { tpl },
          ) => tpl`
          ${imports}
          ${interfaces}
          interface Props { x?: string }
          export const ${`${componentName}:React.FC<Props>`} = ({ x }) => {
            return (${jsx});
          }
          ${exports}`,
          state: { componentName: 'SvgComponent' },
        })
        expect(code).toMatchSnapshot()
      })

      it('supports comments in templates', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          template: ({ jsx }, { tpl }) => tpl`
          /**
           * Comment
           */
          const MyComponent = () => ${jsx}

          export default MyComponent;
          `,
          state: { componentName: 'SvgComponent' },
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('#jsxRuntime', () => {
      it('supports "automatic" jsxRuntime', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          jsxRuntime: 'automatic',
        })
        expect(code).toMatchSnapshot()
      })

      it('supports "classic" jsxRuntime', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          jsxRuntime: 'classic',
        })
        expect(code).toMatchSnapshot()
      })

      it('allows to specify a custom "classic" jsxRuntime using "specifiers"', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          jsxRuntime: 'classic',
          jsxRuntimeImport: { specifiers: ['h'], source: 'preact' },
        })
        expect(code).toMatchSnapshot()
      })

      it('allows to specify a custom "classic" jsxRuntime using "namespace"', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          jsxRuntime: 'classic',
          jsxRuntimeImport: { namespace: 'Preact', source: 'preact' },
        })
        expect(code).toMatchSnapshot()
      })

      it('throws with invalid configuration', () => {
        expect(() => {
          testPlugin(language)('<svg><g /></svg>', {
            jsxRuntime: 'classic',
            jsxRuntimeImport: { source: 'preact' },
          })
        }).toThrow(
          'Specify either "namespace" or "specifiers" in "jsxRuntimeImport" option',
        )
      })
    })

    it('allows to specify a different import source', () => {
      const { code } = testPlugin(language)('<svg><g /></svg>', {
        memo: true,
        ref: true,
        importSource: 'preact/compat',
        jsxRuntimeImport: { specifiers: ['h'], source: 'preact' },
      })
      expect(code).toMatchSnapshot()
    })
  })
})
