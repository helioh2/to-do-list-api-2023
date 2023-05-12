import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    }
});

export const Usuario = model("Usuario", usuarioSchema);