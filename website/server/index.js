/* eslint-disable import/no-extraneous-dependencies */
const bodyParser = require('body-parser')
const next = require('next')
const express = require('express')
const cors = require('cors')
const { default: svgr } = require('@svgr/core')
const { default: jsx } = require('@svgr/plugin-jsx')
const { default: svgo } = require('@svgr/plugin-svgo')
const { default: prettier } = require('@svgr/plugin-prettier')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.post('/api/svgr', cors(), bodyParser.json(), (req, res) => {
    svgr(req.body.code, { ...req.body.options, plugins: [svgo, jsx, prettier] })
      .then(output => {
        res.send({ output })
      })
      .catch(error => {
        res.send({ error: error.message })
      })
  })

  server.get('*', handle)

  server.listen(3000, err => {
    if (err) throw err
    /* eslint-disable no-console */
    console.log('> Ready on http://localhost:3000')
    /* eslint-enable no-console */
  })
})
