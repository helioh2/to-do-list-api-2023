import { Usuario } from "../models/Usuario.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10
const SECRET_KEY = process.env.SECRET_KEY || "SECRETKEY";

class AuthError extends Error {
    constructor(args){
        super(args);
        this.name = "AuthError"
    }
}

const autenticaUsuario = async (usuario) => {
    
    const usuarioBd = await Usuario.findOne({username: usuario.username})
    if (compareSync(usuario.senha, usuarioBd.senha)) {
        usuarioBd.senha = ""
        const payload = {user: JSON.stringify(usuarioBd)}
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '60m'})
        return {usuario: usuarioBd, token: token};
    } else {
        throw new AuthError("Não foi possível autenticar usuário");
    }
}

const createUsuario = async (usuario) => {
    const hash = hashSync(usuario.senha, SALT_ROUNDS);
    usuario.senha = hash;
    return await Usuario.create(usuario);
}


export default {
    autenticaUsuario,
    createUsuario
}