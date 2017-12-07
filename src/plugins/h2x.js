import { transform } from 'h2x-core'

export default (code, opts, state) => transform(code, { ...opts, state })
