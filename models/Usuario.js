const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    senha: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("Usuario", usuarioSchema);