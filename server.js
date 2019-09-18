require('dotenv').config()
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

const port = process.env.PORT || 4000

const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.USERNAME,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/clients', (req, res) => {
  knex('mpc_clients')
    .select('*')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(e => {
      res.status(500).send(`Error: ${e}`)
    })
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
