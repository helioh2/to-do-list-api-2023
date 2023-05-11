const Usuario = require("../models/Usuario")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10
const SECRET_KEY = process.env.SECRET_KEY || "SECRETKEY";

const autenticaUsuario = async (usuario) => {
    const usuarioBd = await Usuario.findOne({username: usuario.username})
    if (bcrypt.compareSync(usuario.senha, usuarioBd.senha)) {
        usuarioBd.senha = ""
        const payload = {user: JSON.stringify(usuarioBd)}
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '60m'})
        return {usuario: usuarioBd, token: token};
    } else {

        throw new Error("Não foi possível autenticar usuário");
    }
}

const createUsuario = async (usuario) => {
    const hash = bcrypt.hashSync(usuario.senha, SALT_ROUNDS);
    usuario.senha = hash;
    return await Usuario.create(usuario);
}


const validarToken = (token) => {
    try {
        const payload = jwt.verify(token, SECRET_KEY)
        console.log(payload)
        const user = payload.user
        return user
    } catch (err) {
        throw new Error("Erro de autenticação: " + err);
    }

}

module.exports = {
    autenticaUsuario,
    createUsuario,
    validarToken
}