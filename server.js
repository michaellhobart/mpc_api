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

app.put('/updateclient/:id', (req, res) => {
  const clientId = req.params.id
  const updateClient = req.body

  knex('mpc_clients_test')
    .returning(['id', 'client_name', 'email', 'phone', 'contact'])
    .where('id', '=', clientId)
    .update({
      client_name: updateClient.client_name,
      email: updateClient.email,
      phone: updateClient.phone,
      contact: updateClient.contact
    })
    .then(data => res.status(200).json(data))
    .catch(e => res.status(500).send(`Error: ${e}`))
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
