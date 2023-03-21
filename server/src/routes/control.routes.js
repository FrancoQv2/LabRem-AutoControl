import express from "express";
import { controlController } from "../controllers/control.controller.js";
import { estroboscopicoController } from "../controllers/estroboscopico.controller.js";
import { posicionController } from "../controllers/posicion.controller.js";

const { getLaboratorios, getLaboratorioById, getEnsayosUsuario, getEnsayos, getDeleteEnsayo, getDeleteLaboratorio, postModLab, postArduino, GetArduino } = controlController;
const { postLabEstroboscopico} = estroboscopicoController;
const { postLabPosicion, getEnsayosPosicion } = posicionController;

const controlRouter = express.Router();

/**
 * -----------------------------------------------------
 * Rutas - Laboratorios de control
 * -----------------------------------------------------
 */
controlRouter.route("/").get(getLaboratorios);

controlRouter.route("/posicion").get(getEnsayosPosicion).post(postLabPosicion);

controlRouter.route("/estroboscopico").post(postLabEstroboscopico);

controlRouter.route("/modificarLab").post(postModLab); //para el grupo de gestion

/**
 * -----------------------------------------------------
 * Rutas con pasaje de parametro en la URL
 * -----------------------------------------------------
 */
controlRouter.route("/:idLaboratorio").get(getLaboratorioById);

controlRouter.route("/delete/ensayo/:idEnsayo").get(getDeleteEnsayo); //para el grupo de gestion

controlRouter.route("/delete/laboratorio/:idLaboratorio").get(getDeleteLaboratorio); //para el grupo de gestion

controlRouter.route("/ensayos/:idLaboratorio").get(getEnsayos); //para el grupo de gestion

controlRouter.route("/arduino/:id").post(postArduino).get(GetArduino);

controlRouter.route("/:idLaboratorio/:idUsuario").get(getEnsayosUsuario);


export default controlRouter;
