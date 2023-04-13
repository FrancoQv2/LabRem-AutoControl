import { sequelize, delay } from "../index.js";
import axios from "axios";

const idLaboratorio = 1;

const estroboscopicoController = {};

/**
 * -----------------------------------------------------
 * Function - postLabEstroboscopico
 * -----------------------------------------------------
 */
estroboscopicoController.postLabEstroboscopico = async (req, res) => {
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
    const url='http://192.168.100.75:3031/api/control/arduino';//cambiar por ip arduino
    const body={
      "Estado" : [3,false,true],
      "Analogico" : [1,1,1]
    };
    let respuestaGet;
    let Msj='';
    try {
      let i=0;
      do {
        respuestaGet = await axios.get(`${url}/${i}`);
        await delay(3000);
        i = i+1;
      } while (respuestaGet.data.Estado[2]);
      switch (respuestaGet.data.Error) {
        case 0:
          
          Msj="laboratorio ok";
          break;
        case 1:
          Msj="Error en el angulo limite de azimut";
          break;
        case 2:
          Msj="Error en el angulo limite de elevacion";
          break;
        default:
          Msj="Error de laboratorio incorrecto";
          break;
      }
      res.status(200).json(Msj);
    } catch (error) {
      console.error("-> ERROR poststroboscopicos:", error);
    }
  }
};

estroboscopicoController.postLabEstroboscopicoSave = (req, res) => {
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
      res.status(200).json("guardado en base de datos");
    } catch (error) {
      console.error("-> ERROR poststroboscopicos:", error);
    }
  }
};
export { estroboscopicoController };
