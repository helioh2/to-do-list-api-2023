const routes = require("express").Router();
const TarefaController = require("../controllers/TarefaController");
const AutenticacaoController = require("../controllers/AutenticacaoController");

routes.get("/tarefas", TarefaController.getAllTarefas);
routes.get("/tarefas/:id", TarefaController.getTarefaById);
routes.post("/tarefas", TarefaController.createTarefa);
routes.patch("/tarefas/:id", TarefaController.editarTarefa);
routes.delete("/tarefas/:id", TarefaController.apagarTarefa);


routes.post("/usuarios", AutenticacaoController.signup);
routes.post("/usuarios/login", AutenticacaoController.login);

module.exports = routes;
