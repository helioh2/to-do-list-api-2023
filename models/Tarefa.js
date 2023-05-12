import { Schema, model } from "mongoose";

const tarefaSchema = new Schema({
    texto: {
        type: String,
        required: true,
    },
    feito: {
        type: Boolean,
        required: true,
        default: false,
    },
    data: {
        type: Date,
        default: Date.now(),
    },
    idUsuario: {
        type: String,
        required: true,
    }
});

export const Tarefa = model("Tarefa", tarefaSchema);
