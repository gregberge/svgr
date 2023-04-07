import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import json from '@rollup/plugin-json'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = JSON.parse(
  readFileSync(resolve(process.cwd(), './package.json'), 'utf-8'),
)
const name = pkg.main ? pkg.main.replace(/\.js$/, '') : './dist/index'

const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
  external: (id) => !/^[./]/.test(id),
})

export default [
  bundle({
    plugins: [json(), esbuild()],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: Boolean(pkg.main),
        exports: 'auto',
      },
    ],
  }),
  ...(pkg.main
    ? [
        bundle({
          plugins: [
            dts({
              compilerOptions: {
                // https://github.com/Swatinem/rollup-plugin-dts/issues/143
                preserveSymlinks: false,
              },
            }),
          ],
          output: {
            file: `${name}.d.ts`,
            format: 'es',
          },
        }),
      ]
    : []),
]
