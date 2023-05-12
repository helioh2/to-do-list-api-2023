import { connect } from "mongoose";

const conectarAoDb = () => {
  connect(
      process.env.DB_URI, // setar por variável de ambiente mais tarde
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("MongoDB Atlas CONECTADO!"))
    .catch((err) => console.log(err)); 
};

export default conectarAoDb;
