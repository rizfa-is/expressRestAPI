require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const projectRouter = require('./src/routers/project')

const port = process.env.PORT

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/project', projectRouter)

app.get('/', (req, res) => {
  res.send('Backend Android2!')
})

app.listen(port, () => {
  console.log(`Listen app backend on port ${port}`)
})
