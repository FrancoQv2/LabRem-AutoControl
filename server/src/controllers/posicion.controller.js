import { sequelize, delay } from "../index.js";
import axios from "axios";

const idLaboratorio = 2;

const posicionController = {};

/**
 * -----------------------------------------------------
 * Function - postLabPosicion
 * -----------------------------------------------------
 */
posicionController.postLabPosicion = async (req, res) => {
  const { 
    idUsuario,
    Rapidez,
    anguloSalida,
    Modificacion,
    RapidezControl,
    anguloSalidaControl,
  } = req.body;

  if (Rapidez < 0 || Rapidez > 100) {
    res.status(400).json("la rapidez es menor a 0 o superior a 100");
  } else if (RapidezControl < 0 || RapidezControl > 100) {
    res.status(400).json("la rapidez de control es menor a 0 o superior a 100");
  } else if (anguloSalida < -180 || anguloSalida > 180) {
    res.status(400).json("el angulo de salida es inferior a -180 o superior a 180");
  } else if (anguloSalidaControl < -180 || anguloSalidaControl > 180) {
    res.status(400).json("el angulo de salida de control es inferior a -180 o superior a 180");
  } else if (Modificacion != "retardos" && Modificacion != "no linealidades" && Modificacion != "polos-ceros extras") {
    res.status(400).json("la modificacion del driver no es retardos, no linealidades ni polos-ceros extras");
  } else {
    const url='http://control-dev:3000/api/control/arduino';//cambiar por ip arduino
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
/**
 * -----------------------------------------------------
 * Function - postLabPosicionSave
 * -----------------------------------------------------
 */
posicionController.postLabPosicionSave = (req, res) => {
  const { 
    idUsuario,
    Rapidez,
    anguloSalida,
    Modificacion,
    RapidezControl,
    anguloSalidaControl,
  } = req.body;
  console.log(Modificacion)
  if (Rapidez < 0 || Rapidez > 100) {
    res.status(400).json("la rapidez es menor a 0 o superior a 100");
  } else if (RapidezControl < 0 || RapidezControl > 100) {
    res.status(400).json("la rapidez de control es menor a 0 o superior a 100");
  } else if (anguloSalida < -180 || anguloSalida > 180) {
    res.status(400).json("el angulo de salida es inferior a -180 o superior a 180");
  } else if (anguloSalidaControl < -180 || anguloSalidaControl > 180) {
    res.status(400).json("el angulo de salida de control es inferior a -180 o superior a 180");
  } else if (Modificacion != "retardos" && Modificacion != "no linealidades" && Modificacion != "polos-ceros extras") {
    res.status(400).json("la modificacion del driver no es retardos, no linealidades ni polos-ceros extras");
  } else {

    const datosEntrada = {
      Rapidez:Rapidez,
      anguloSalida:anguloSalida,
      Modificacion:Modificacion,
      RapidezControl:RapidezControl,
      anguloSalidaControl:anguloSalidaControl,
    };

    const datosSalida = {
      //le dudo pero entiendo que no tendria salida
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
      console.error("-> ERROR postLabPosicion:", error);
    }
  }
};

export { posicionController };
