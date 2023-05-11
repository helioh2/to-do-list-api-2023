const UsuarioService = require("../services/UsuarioService");
const StatusCodes = require('http-status-codes').StatusCodes;


const signup = async (req, res) => {
  let usuario = req.body;
  try {
    usuario = await UsuarioService.createUsuario(usuario);
    usuario.senha = ""
    res.send(usuario)
  } catch (err) {
    res.status(500).send({error: err.message})
  } 
}

const login = async (req, res) => {
  let usuario = req.body;
  console.log(usuario)
  try {
    let dados = await UsuarioService.autenticaUsuario(usuario);
    res.set("x-access-token", dados.token);
    res.send(dados)
  } catch (err) {
    console.trace(err)
    res.status(500).send({error: err.message})
  } 
};


module.exports = {
  login,
  signup
};
