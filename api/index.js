const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
const ebooks = require('./routes/ebooks')

app.use(ebooks)

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
