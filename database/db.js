const mongoose = require("mongoose");

const conectarAoDb = () => {
  mongoose
    .connect(
      process.env.DB_URI, // setar por variável de ambiente mais tarde
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("MongoDB Atlas CONECTADO!"))
    .catch((err) => console.log(err)); 
};

module.exports = conectarAoDb;
