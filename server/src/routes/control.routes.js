import express from "express";
import { controlController } from "../controllers/control.controller.js";
import { estroboscopicoController } from "../controllers/estroboscopico.controller.js";
import { posicionController } from "../controllers/posicion.controller.js";

const { getLaboratorios, getLaboratorioById, getEnsayosUsuario } = controlController;
const { postLabEstroboscopico, getEnsayosEstroboscopico } = estroboscopicoController;
const { postLabPosicion, getEnsayosPosicion } = posicionController;

const controlRouter = express.Router();

/**
 * -----------------------------------------------------
 * Rutas - Laboratorios de control
 * -----------------------------------------------------
 */
controlRouter.route("/").get(getLaboratorios);

controlRouter.route("/posicion").get(getEnsayosPosicion).post(postLabPosicion);

controlRouter.route("/estroboscopico").get(getEnsayosEstroboscopico).post(postLabEstroboscopico);

/**
 * -----------------------------------------------------
 * Rutas con pasaje de parametro en la URL
 * -----------------------------------------------------
 */
controlRouter.route("/:idLaboratorio").get(getLaboratorioById);

controlRouter.route("/posicion/:idUsuario").get(getEnsayosUsuario);

controlRouter.route("/estroboscopico/:idUsuario").get(getEnsayosUsuario);

controlRouter.route("/:idLaboratorio/:idUsuario").get(getEnsayosUsuario);


export default controlRouter;
