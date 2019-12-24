/* eslint-disable import/no-extraneous-dependencies */
const { default: svgr } = require('../packages/core')
const { default: jsx } = require('../packages/plugin-jsx')
const { default: svgo } = require('../packages/plugin-svgo')
const { default: prettier } = require('../packages/plugin-prettier')

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
