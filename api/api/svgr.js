/* eslint-disable @typescript-eslint/no-var-requires */
const { transform } = require('@svgr/core')
const jsx = require('@svgr/plugin-jsx')
const svgo = require('@svgr/plugin-svgo')
const prettier = require('@svgr/plugin-prettier')

module.exports = (req, res) => {
  if (!req.body) {
    res.status(204).send('')
    return
  }
  transform(req.body.code, {
    ...req.body.options,
    plugins: [svgo, jsx, prettier],
  })
    .then((output) => {
      res.status(200).json({ output })
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}
