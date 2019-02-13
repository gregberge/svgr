/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const { default: svgr } = require('@svgr/core')
const { default: jsx } = require('@svgr/plugin-jsx')
const { default: svgo } = require('@svgr/plugin-svgo')
const { default: prettier } = require('@svgr/plugin-prettier')

const app = express()

app.use(cors())

app.post('/api/svgr', bodyParser.json(), (req, res) => {
  svgr(req.body.code, { ...req.body.options, plugins: [svgo, jsx, prettier] })
    .then(output => {
      res.send({ output })
    })
    .catch(error => {
      res.send({ error: error.message })
    })
})

app.get('*', (req, res) => {
  res.redirect('https://www.smooth-code.com/open-source/svgr/playground/')
})

module.exports = app
