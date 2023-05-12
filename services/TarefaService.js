import {Tarefa} from "../models/Tarefa.js";

const getAllTarefasByIdUsuario = async (idUsuario) => {
    return await Tarefa.find({idUsuario: idUsuario});
}

const getTarefaById = async (idTarefa, idUsuario) => {
    const tarefa = await Tarefa.find({_id: idTarefa, idUsuario: idUsuario});
    return tarefa
}

const createTarefa = async (tarefa) => {
    await Tarefa.create(tarefa)
}

const updateTarefa = async (idTarefa, edicao, idUsuario) => {
    await Tarefa.updateOne({ _id: idTarefa, idUsuario: idUsuario }, edicao)
    return getTarefaById(idTarefa, idUsuario)
}

const deleteTarefaById = async (id, idUsuario) => {
    await Tarefa.deleteOne({_id: id, idUsuario: idUsuario});
}



export default {
    getTarefaById,
    getAllTarefasByIdUsuario,
    createTarefa,
    updateTarefa,
    deleteTarefaById
}