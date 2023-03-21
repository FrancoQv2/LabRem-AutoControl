import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const idLaboratorio = 1;

const estroboscopicoController = {};

/**
 * -----------------------------------------------------
 * Function - postLabEstroboscopico
 * -----------------------------------------------------
 */
estroboscopicoController.postLabEstroboscopico = (req, res) => {
  const {
    idUsuario,
    FrecuenciaCaidaAgua,
    FrecuenciaLuz,
    CaidaAgua,
  } = req.body;

  if (FrecuenciaCaidaAgua < 0 || FrecuenciaCaidaAgua > 2147483647) {
    res.status(400).json("la frecuencia de caida del agua es inferior a 0 o superior a 2147483647 (32 bit)");
  } else if (FrecuenciaLuz < 0 || FrecuenciaLuz > 2147483647) {
    res.status(400).json("la frecuencia de la luz es inferior a 0 o superior a 2147483647 (32 bit)");
  } else {
    const datosEntrada = {
    FrecuenciaCaidaAgua: FrecuenciaCaidaAgua,
    FrecuenciaLuz: FrecuenciaLuz,
    CaidaAgua: CaidaAgua,
    };
     // Estos datos se deben obtener
     const datosSalida = {
      FrecuenciaAparente: 10, 
    };
    try {
      sequelize.query(
        "CALL sp_crearEnsayo (:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);",
        {
          replacements: {
            idUsuario: idUsuario,
            datosEntrada: JSON.stringify(datosEntrada),
            datosSalida: JSON.stringify(datosSalida),
            idLaboratorio: idLaboratorio,
          }
        }
      );
      res.status(200).json("Parámetros correctos");
    } catch (error) {
      console.error("-> ERROR poststroboscopicos:", error);
    }
  }
};

export { estroboscopicoController };
