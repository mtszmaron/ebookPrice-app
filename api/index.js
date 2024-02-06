const express = require('express')
const bodyParser = require('body-parser')
// Create express instance
const app = express()

// Require API routes
// const users = require('./routes/users')
app.use(bodyParser.json())
const test = require('./routes/ebooks')

// Import API Routes
// app.use(users)
app.use(test)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
