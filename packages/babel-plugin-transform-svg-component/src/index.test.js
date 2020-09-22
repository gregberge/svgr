import { transform } from '@babel/core'
import plugin from '.'

const testPlugin = (language) => (code, options) => {
  const result = transform(code, {
    plugins: [
      '@babel/plugin-syntax-jsx',
      [plugin, { ...options, typescript: language === 'typescript' }],
    ],
    configFile: false,
  })

  return result
}

describe('plugin', () => {
  describe.each(['javascript', 'typescript'])('%s', (language) => {
    it('transforms whole program', () => {
      const { code } = testPlugin(language)('<svg><g /></svg>', {
        state: { componentName: 'SvgComponent' },
      })
      expect(code).toMatchSnapshot()
    })

    describe('with "native" option', () => {
      it('adds import from "react-native-svg"', () => {
        const { code } = testPlugin(language)('<Svg><g /></Svg>', {
          state: { componentName: 'SvgComponent' },
          native: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "native.expo" option', () => {
      it('adds import from "react-native-svg" & from "expo"', () => {
        const { code } = testPlugin(language)('<Svg><g /></Svg>', {
          state: { componentName: 'SvgComponent' },
          native: { expo: true },
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "ref" option', () => {
      it('adds ForwardRef component', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          state: { componentName: 'SvgComponent' },
          ref: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "titleProp"', () => {
      it('adds "titleProp" and "titleId" prop', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          state: { componentName: 'SvgComponent' },
          titleProp: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "titleProp" and "expandProps"', () => {
      it('adds "titleProp", "titleId" props and expands props', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          state: { componentName: 'SvgComponent' },
          expandProps: true,
          titleProp: true,
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('with "expandProps"', () => {
      it('add props', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
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
            caller: { previousExport: 'export default "logo.svg";' },
          },
          namedExport: 'Component',
        })
        expect(code).toMatchSnapshot()
      })
    })

    describe('custom templates', () => {
      it('support basic template', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          template: (
            { template },
            opts,
            { jsx },
          ) => template.ast`import * as React from 'react';
      const MyComponent = () => ${jsx}
      export default MyComponent
    `,
          state: { componentName: 'SvgComponent' },
        })
        expect(code).toMatchSnapshot()
      })

      describe('it supports JSX template', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          template: ({ template }, opts, { jsx }) => {
            const jsxTemplate = template.smart({ plugins: ['jsx'] })
            return jsxTemplate.ast`import * as React from 'react';
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
          template: ({ template }, opts, { jsx }) => {
            const typescriptTemplate = template.smart({
              plugins: ['typescript'],
            })
            return typescriptTemplate.ast`
              import * as React from 'react';
              const MyComponent = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
              export default MyComponent;
            `
          },
          state: { componentName: 'SvgComponent' },
        })
        expect(code).toMatchSnapshot()
      })

      it('supports template that does not return an array', () => {
        const { code } = testPlugin(language)('<svg><g /></svg>', {
          template: ({ template }, opts, { jsx }) => template.ast`${jsx}`,
          state: { componentName: 'SvgComponent' },
        })
        expect(code).toMatchSnapshot()
      })
    })
  })
})
