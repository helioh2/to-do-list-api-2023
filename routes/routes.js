import {Router} from "express";
import { getAllTarefas, getTarefaById, createTarefa, editarTarefa, apagarTarefa } from "../controllers/TarefaController.js";
import { signup, login, validaToken } from "../controllers/AutenticacaoController.js";

import {authMiddleware} from "../middlewares/auth.middleware.js";

const routes = Router();

routes.get("/tarefas", authMiddleware, getAllTarefas);
routes.get("/tarefas/:id", authMiddleware, getTarefaById);
routes.post("/tarefas", authMiddleware, createTarefa);
routes.patch("/tarefas/:id", authMiddleware, editarTarefa);
// routes.put("/tarefas/:id", authMiddleware, editarTarefaPut);
routes.delete("/tarefas/:id", authMiddleware, apagarTarefa);


routes.post("/usuarios", signup);
routes.post("/usuarios/login", login);
routes.post("/usuarios/login/valid", validaToken);

export default routes;
