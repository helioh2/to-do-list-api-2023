const TarefaService = require("../services/TarefaService")
const Usuario = require("../models/Usuario");

const getAllTarefas = async (req, res) => {
    
    const usuarios = await Usuario.find().limit(1) //PEGANDO PRIMEIRO USUARIO DO BANCO POR ENQUANTO
    const idUsuario = usuarios[0]["_id"]
    try {
        const listaTarefas = await TarefaService.getAllTarefasByIdUsuario(idUsuario);
        res.send(listaTarefas);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}

const getTarefaById = async (req, res) => {
    //TODO
}


const editarTarefaPut = async (req, res) => {
    const tarefa = req.body;
    console.log(tarefa)
    try {
        const tarefa = await TarefaService.updateTarefa(tarefa);
        res.send(tarefa)
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}

const editarTarefaPatch = async (req, res) => {
    //TODO...
}


const createTarefa = async (req, res) => {
    const tarefa = req.body;
    console.log(tarefa);
    const usuarios = await Usuario.find().limit(1) //PEGANDO PRIMEIRO USUARIO DO BANCO POR ENQUANTO
    const idUsuario = usuarios[0]["_id"]
    tarefa.idUsuario = idUsuario

    try {
        const tarefaRes = await TarefaService.createTarefa(tarefa);
        return res.send(tarefaRes);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}

const apagarTarefa = async (req, res) => {
    const id = req.params.id;
    try {
        await TarefaService.deleteTarefaById(id);
        res.send({})
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}



module.exports = {
    getAllTarefas,
    createTarefa,
    editarTarefaPut,
    editarTarefaPatch,
    apagarTarefa,
    getTarefaById
}