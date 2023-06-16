import UsuarioService from "../services/UsuarioService.js";
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || "SECRETKEY";

export const signup = async (req, res) => {
  /* 	#swagger.tags = ['Usuario']
        #swagger.description = 'Cadastra novo usuario' */
  
  /*  #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/components/schemas/Usuario' }
    } */

  let usuario = req.body;
  try {
    usuario = await UsuarioService.createUsuario(usuario);
    usuario.senha = ""
    res.send(usuario)
  } catch (err) {
    res.status(500).send({error: err.message})
  } 
}

export const login = async (req, res) => {
  /* 	#swagger.tags = ['Usuario']
        #swagger.description = 'Realiza login (gera token JWT)' */

  /*  #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/components/schemas/Tarefa' }
    } */
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

export const validaToken = async (req, res) => {
  try {
    let token = req.body.token;
    
    jwt.verify(token, SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(StatusCodes.UNAUTHORIZED).send({ message: "Token inválido!" });
      }

      if (!decoded.user) {
        return res.status(StatusCodes.UNAUTHORIZED).send({ message: "Token inválido!" });
      }

      return res.status(StatusCodes.OK).send({message: "Token válido"});
    });
  } catch (err) {
    res.status(500).send({error: err.message})
  }
}