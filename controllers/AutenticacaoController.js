const UsuarioService = require("../services/UsuarioService");
const StatusCodes = require('http-status-codes').StatusCodes;

const loginForm = (req, res) => {
  return res.render("loginForm");
};

const signupForm = (req, res) => {
  return res.render("signupForm");
};

const signup = async (req, res) => {
  let usuario = req.body;
  try {
    usuario = await UsuarioService.createUsuario(usuario);
  } catch (err) {
    res.status(500).send({error: err.message})
  } 
  if (!usuario) {
    res.status(StatusCodes.UNAUTHORIZED).send({error: "Cadastro inválido."})
  } else {
    req.session.usuarioLogado = usuario
    res.redirect("/")
  }
}

const login = async (req, res) => {
  let usuario = req.body;
  try {
    usuario = await UsuarioService.autenticaUsuario(usuario);
  } catch (err) {
    res.status(500).send({error: err.message})
  } 
  if (!usuario) {
    res.status(StatusCodes.UNAUTHORIZED).send({error: "Login inválido."})
  } else {
    req.session.usuarioLogado = usuario
    res.redirect("/")
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/")
};

module.exports = {
  loginForm,
  signupForm,
  login,
  logout,
  signup
};
