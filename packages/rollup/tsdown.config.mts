import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: 'src/index.ts',
    format: ['esm'],
  },
  {
    entry: 'src/index.ts',
    format: ['cjs'],
    dts: false,
  },
])
