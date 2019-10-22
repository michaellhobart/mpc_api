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

app.get('/clients', (req, res) => {
  knex('mpc_clients_test')
    .select('*')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(e => {
      res.status(500).send(`Error: ${e}`)
    })
})

app.get('/clients/:id', (req, res) => {
  const clientId = req.params.id
  knex('mpc_clients_test')
    .where('id', clientId)
    .select('*')
    .then(data => {
      if (data.length < 1) {
        res.status(404)
          .send(`No clients with id ${clientId}`)
      } else {
        res.status(200)
          .json(data)
      }
    })
    .catch(e => {
      res.status(500)
        .send(`Error: ${e}`)
    })
})

app.post('/newclient', (req, res) => {
  const newClient = req.body

  knex('mpc_clients_test')
    .returning(['id', 'client_name'])
    .insert({
      client_name: newClient.client_name,
      email: newClient.email,
      phone: newClient.phone,
      contact: newClient.contact
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(e => {
      res.status(500).send(`Error: ${e}`)
    })
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
    .then(data => {
      if (data.length === 0){
        res.status(404).send(`No client found with id ${clientId}.`)
      } else {
        res.status(200).json(data)
      }
    })
    .catch(e => res.status(500).send(`Error: ${e}`))
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
