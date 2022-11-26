import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const idLaboratorio = 2;

const posicionController = {};

/**
 * -----------------------------------------------------
 * Function - getEnsayosPosicion
 * -----------------------------------------------------
 */
posicionController.getEnsayosPosicion = async (req, res) => {
  console.log(req.params);

  const response = await sequelize.query(
    "SELECT idUsuario, DATE(fechaHora) AS Fecha, TIME(fechaHora) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = '2';",
    {
      replacements: {
        idLaboratorio: idLaboratorio
      },
      type: QueryTypes.SELECT,
    }
  );

  console.log(response);
  
  let dataParsed = [];
  response.map((ensayo)=>{
    const newEnsayo = {}
    newEnsayo.Usuario = ensayo.idUsuario
    newEnsayo.Fecha = ensayo.Fecha
    newEnsayo.Hora = ensayo.Hora
    newEnsayo.Estado = ensayo.datosEntrada.Estado
    newEnsayo.Posicion = ensayo.datosEntrada.Posicion
    newEnsayo.Velocidad = ensayo.datosEntrada.Velocidad
    newEnsayo.Tiempo = ensayo.datosEntrada.Tiempo
    newEnsayo.Exitacion = ensayo.datosEntrada.Exitacion
    dataParsed.push(newEnsayo)
  })
  
  console.log(dataParsed);
  await res.send(dataParsed);
};

/**
 * -----------------------------------------------------
 * Function - postLabPosicion
 * -----------------------------------------------------
 */
posicionController.postLabPosicion = (req, res) => {
  const { 
    idUsuario,
    Estado,
    Posicion,
    Velocidad,
    Tiempo,
    Exitacion 
  } = req.body;

  if (Posicion < 0 || Posicion > 100) {
    res.status(400).json("la posicion es menor a 0 o superior a x");
  } else if (Velocidad < 0) {//consulta por condiciones perro, por que la velocidad si puede ser negativa al igual que la posicion
    res.status(400).json("la velocidad es negativa");
  } else if (Tiempo < 0) {
    res.status(400).json("el tiempo no puede ser negativo");
  } else {

    const datosEntrada = {
    Estado: Estado,
    Posicion: Posicion,
    Velocidad: Velocidad,
    Tiempo: Tiempo,
    Exitacion: Exitacion 
    };

    const datosSalida = {
      //le dudo pero entiendo que no tendria salida
    };
    
    try {
      sequelize.query(
        "INSERT INTO Ensayos(idUsuario,datosEntrada,datosSalida,idLaboratorio) VALUES(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);",
        {
          replacements: {
            idUsuario: idUsuario,
            datosEntrada: JSON.stringify(datosEntrada),
            datosSalida: JSON.stringify(datosSalida),
            idLaboratorio: idLaboratorio,
          },
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).json("Parámetros correctos");
    } catch (error) {
      console.error("-> ERROR postLabPosicion:", error);
    }
  }
};

export { posicionController };
