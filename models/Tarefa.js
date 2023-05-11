const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Tarefa", tarefaSchema);