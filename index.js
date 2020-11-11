const express = require('express')
const db = require('./src/helpers/db')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT
const projectRouter = require('./src/routers/project')
require('dotenv').config()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/project', projectRouter)

app.get('/', (_req, res) => {
  res.send('Backend Android2!')
})

app.listen(port, () => {
  console.log(`Listen app backend on port ${port}`)
})
