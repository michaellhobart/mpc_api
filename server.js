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
    if (data.length < 1){
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

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
})
