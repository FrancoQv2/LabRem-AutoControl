import express from "express";
import { controlController } from "../controllers/control.controller.js";
import { estroboscopicoController } from "../controllers/estroboscopico.controller.js";
import { posicionController } from "../controllers/posicion.controller.js";

const { getLaboratorios, getLaboratorioById, getEnsayosUsuario, getEnsayos, getDeleteEnsayo, getDeleteLaboratorio, postModLab, postArduino, GetArduino } = controlController;
const { postLabEstroboscopico, postLabEstroboscopicoSave} = estroboscopicoController;
const { postLabPosicion, postLabPosicionSave } = posicionController;

const controlRouter = express.Router();

/**
 * -----------------------------------------------------
 * Rutas - Laboratorios de control
 * -----------------------------------------------------
 */
controlRouter.route("/").get(getLaboratorios);

controlRouter.route("/posicion").post(postLabPosicion);
controlRouter.route("/posicionsave").post(postLabPosicionSave);

controlRouter.route("/estroboscopico").post(postLabEstroboscopico);

controlRouter.route("/estroboscopicosave").post(postLabEstroboscopicoSave);

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
