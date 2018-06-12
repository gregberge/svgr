const path = require('path')
const fs = require('fs')

const config = fs.readFileSync(path.join(__dirname, '.babelrc'))

module.exports = JSON.parse(config)
