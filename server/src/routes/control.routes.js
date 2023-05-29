import express from "express"
import { controlController } from "../controllers/control.controller.js"
import { submuestreoController } from "../controllers/submuestreo.controller.js"
import { posicionController } from "../controllers/posicion.controller.js"

const { getLaboratorios, getLaboratorio, getEnsayosUsuario, deleteEnsayo, deleteLaboratorio, postLaboratorio, getEnsayos, updateLaboratorio } = controlController
const { getEnsayosSubmuestreo, postEnsayoSubmuestreo } = submuestreoController
const { getEnsayosPosicion, postEnsayoPosicion } = posicionController

const controlRouter = express.Router()

// -----------------------------------------------------
// Endpoints - Laboratorios de Automatización y Control
// -----------------------------------------------------

controlRouter.route("/")
    .get(getLaboratorios)
    .post(postLaboratorio)
    
controlRouter.route("/submuestreo")
    .get(getEnsayosSubmuestreo)
    .post(postEnsayoSubmuestreo)

controlRouter.route("/posicion")
    .get(getEnsayosPosicion)
    .post(postEnsayoPosicion)

// -----------------------------------------------------
// Endpoints para Gestión
// -----------------------------------------------------

controlRouter.route("/laboratorios/:idLaboratorio")
    .get(getLaboratorio)
    .post(updateLaboratorio)
    .delete(deleteLaboratorio)

controlRouter.route("/ensayos/:idLaboratorio")
    .get(getEnsayos)

controlRouter.route("/ensayos/:idEnsayo")
    .delete(deleteEnsayo)

// -----------------------------------------------------
// Endpoints con pasaje de parametro en la URL
// -----------------------------------------------------

controlRouter.route("/:idLaboratorio")
    .get(getLaboratorio)

controlRouter.route("/:idLaboratorio/:idUsuario")
    .get(getEnsayosUsuario)

export default controlRouter
