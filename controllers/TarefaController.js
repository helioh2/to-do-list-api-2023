const { StatusCodes } = require("http-status-codes");
const TarefaService = require("../services/TarefaService")
const UsuarioService = require("../services/UsuarioService")


const getTokenFromRequest = (req, res) => {
    const [, token] = req.headers.authorization?.split(" ") || [" ", " "];
    
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send(
            {error: "Acesso negado. Nenhum token fornecido."}
        );
        
    }

    return token
}

const returnError = (err, res) => {
    // console.trace(err)
    let statusCode = 500
    if (err.name == "AuthError"){
        statusCode = StatusCodes.UNAUTHORIZED
    }
    res.status(statusCode).send({error: err.message})
}

const getAllTarefas = async (req, res) => {
    
    const token = getTokenFromRequest(req, res);

    try {
        const usuario = UsuarioService.validarToken(token)
        const listaTarefas = await TarefaService.getAllTarefasByIdUsuario(usuario.id);
        res.send(listaTarefas);
    } catch (err) {
        returnError(err, res)
    }
}

const getTarefaById = async (req, res) => {
    const token = getTokenFromRequest(req, res);
    const idTarefa = req.params.id

    try {
        const usuario = UsuarioService.validarToken(token);
        const tarefa = await TarefaService.getTarefaById(idTarefa, usuario.id);
        res.send(tarefa);
    } catch (err) {
        returnError(err, res);
    }
}


const editarTarefa = async (req, res) => {
    const token = getTokenFromRequest(req, res);

    const edicao = req.body;
    const idTarefa = req.params.id
    try {
        const usuario = UsuarioService.validarToken(token);
        const tarefa = await TarefaService.updateTarefa(idTarefa, edicao, usuario.id);
        res.send(tarefa)
    } catch (err) {
        returnError(err, res);
    }
}

const createTarefa = async (req, res) => {
    const token = getTokenFromRequest(req, res);
    const tarefa = req.body;
    
    try {
        const usuario = UsuarioService.validarToken(token);
        tarefa.idUsuario = usuario.id
        const tarefaRes = await TarefaService.createTarefa(tarefa);
        return res.send(tarefaRes);
    } catch (err) {
        returnError(err, res);
    }
}

const apagarTarefa = async (req, res) => {
    const token = getTokenFromRequest(req, res);
    const id = req.params.id;
    try {
        const usuario = UsuarioService.validarToken(token);
        await TarefaService.deleteTarefaById(id, usuario.id);
        res.send({})
    } catch (err) {
        returnError(err, res);
    }
}

module.exports = {
    getAllTarefas,
    createTarefa,
    editarTarefa,
    apagarTarefa,
    getTarefaById
}