/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const { default: svgr } = require('@svgr/core')
const { default: jsx } = require('@svgr/plugin-jsx')
const { default: svgo } = require('@svgr/plugin-svgo')
const { default: prettier } = require('@svgr/plugin-prettier')

module.exports = (req, res) => {
  if (!req.body) {
    res.status(204).send('')
    return
  }
  svgr(req.body.code, { ...req.body.options, plugins: [svgo, jsx, prettier] })
    .then(output => {
      res.status(200).json({ output })
    })
    .catch(error => {
      res.status(400).json({ error: error.message })
    })
}
