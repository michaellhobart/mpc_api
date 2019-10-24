const express = require('express');
const router = express.Router();

require('dotenv').config()

const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.USERNAME,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD
  }
})

router.get('/', (req, res) => {
  knex('mpc_clients_test')
    .select('*')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(e => {
      res.status(500).send(`Error: ${e}`)
    })
})

router.post('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
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


module.exports = router;
