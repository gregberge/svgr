import prettier from 'prettier'

export default (code, opts) =>
  prettier.format(code, { ...opts, parser: 'babylon' })
