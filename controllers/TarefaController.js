import { StatusCodes } from "http-status-codes";
import TarefaService from "../services/TarefaService.js";


const returnError = (err, res) => {
    let statusCode = 500
    res.status(statusCode).send({error: err.message})
}

export const getAllTarefas = async (req, res) => {

    // TODO: Corrigir swagger para indicar retorno de lista de tarefa
    
    /* 	#swagger.tags = ['Tarefa']
        #swagger.description = 'Endpoint para pegar todas as tarefas'
        #swagger.schema: { $ref: '#/components/schemas/Tarefa' } */

    /*  #swagger.responses[200] = {
            schema: { $ref: '#/components/schemas/Tarefa' }
    } */

    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    try {
        const listaTarefas = await TarefaService.getAllTarefasByIdUsuario(req.user._id);
        res.send(listaTarefas);
    } catch (err) {
        returnError(err, res)
    }
}

export const getTarefaById = async (req, res) => {

    /* 	#swagger.tags = ['Tarefa']
        #swagger.description = 'Endpoint para pegar tarefa por id' */

    /*  #swagger.responses[200] = {
            schema: { $ref: '#/components/schemas/Tarefa' }
    } */

    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    const idTarefa = req.params.id

    try {
        const tarefa = await TarefaService.getTarefaById(idTarefa, req.user._id);
        res.send(tarefa);
    } catch (err) {
        returnError(err, res);
    }
}


export const editarTarefa = async (req, res) => {

    /* 	#swagger.tags = ['Tarefa']
        #swagger.description = 'Endpoint para editar tarefa' */

    /*  #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/components/schemas/Tarefa' }
    } */

    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    try {
        const edicao = req.body;
        const idTarefa = req.params.id
        if (!idTarefa || idTarefa == undefined) {
            returnError(err, res);
        }
    
        const tarefa = await TarefaService.updateTarefa(idTarefa, edicao, req.user._id);
        res.send(tarefa)
    } catch (err) {
        returnError(err, res);
    }
}




// export const editarTarefaPut = async (req, res) => {

//     /* 	#swagger.tags = ['Tarefa']
//         #swagger.description = 'Endpoint para editar tarefa' */

//     /*  #swagger.parameters['obj'] = {
//             in: 'body',
//             schema: { $ref: '#/components/schemas/Tarefa' }
//     } */

//     /* #swagger.security = [{
//             "apiKeyAuth": []
//     }] */

//     const tarefa = req.body;
//     const idTarefa = req.params.id
//     try {
//         const tarefa = TarefaService.updateTarefa(idTarefa, tarefa, req.user._id);
//         res.send(tarefa)
//     } catch (err) {
//         returnError(err, res);
//     }
// }

export const createTarefa = async (req, res) => {

    /* 	#swagger.tags = ['Tarefa']
        #swagger.description = 'Endpoint para criar nova tarefa */

    /*  #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/components/schemas/Tarefa' }
    } */

    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    const tarefa = req.body;
    
    try {
        tarefa.idUsuario = req.user._id
        const tarefaRes = await TarefaService.createTarefa(tarefa);
        return res.send(tarefaRes);
    } catch (err) {
        returnError(err, res);
    }
}

export const apagarTarefa = async (req, res) => {

    /* 	#swagger.tags = ['Tarefa']
        #swagger.description = 'Endpoint para apagar tarefa' */

    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    const id = req.params.id;
    try {
        await TarefaService.deleteTarefaById(id, req.user._id);
        res.send({})
    } catch (err) {
        returnError(err, res);
    }
}

