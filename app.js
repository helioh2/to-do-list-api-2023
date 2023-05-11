require("dotenv").config()

const express = require('express')
const path = require('path');
const routes = require("./routes/routes")
const conectarAoDb = require("./database/db")

conectarAoDb();
const app = express()
const port = process.env.PORT || 3000;  //será alterado por meio de variáveis de ambiente depois 

app.use(express.json())

app.use(routes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})