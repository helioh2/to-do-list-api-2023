const Usuario = require("../models/Usuario")
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10

const autenticaUsuario = async (usuario) => {
    const usuarioBd = await Usuario.findOne({username: usuario.username})
    if (bcrypt.compareSync(usuario.senha, usuarioBd.senha)) {
        usuarioBd.senha = "";
        return usuarioBd;
    }
    return null;
}

const createUsuario = async (usuario) => {
    const hash = bcrypt.hashSync(usuario.senha, SALT_ROUNDS);
    usuario.senha = hash;
    return await Usuario.create(usuario);
}


module.exports = {
    autenticaUsuario,
    createUsuario
}