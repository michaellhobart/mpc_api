require('dotenv').config()
const express = require('express');
const app = express();

const body_parser = require('body-parser');

app.use(body_parser.json());

const port = process.env.PORT || 4000

const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.USERNAME,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD
  }
});


app.get("/", (req, res) => {
  res.json({message: "Hello World!"});
});

app.get("/clients/:id", (req, res) => {
  const clientId = req.params.id;
  knex('mpc_clients')
  .where('id', clientId)
  .select('*')
  .then( data => {
    knex.destroy()
    res.json(data)
  })
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
})
