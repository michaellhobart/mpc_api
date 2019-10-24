require('dotenv').config()
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

const port = process.env.PORT || 4000

const clients = require('./routes/clients')

app.use('/clients', clients);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
