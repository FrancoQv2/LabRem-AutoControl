import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const idLaboratorio = 1;

const estroboscopicoController = {};

/**
 * -----------------------------------------------------
 * Function - getEnsayosEstroboscopico
 * -----------------------------------------------------
 */
estroboscopicoController.getEnsayosEstroboscopico = async (req, res) => {
  console.log(req.params);

  const response = await sequelize.query(
    "SELECT idUsuario, DATE(fechaHora) AS Fecha, TIME(fechaHora) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = '1';",
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
    newEnsayo.FrecuenciaCaidaAgua = ensayo.datosEntrada.FrecuenciaCaidaAgua
    newEnsayo.FrecuenciaLuz = ensayo.datosEntrada.FrecuenciaLuz
    newEnsayo.CaidaAgua = ensayo.datosEntrada.CaidaAgua
    dataParsed.push(newEnsayo)
  })
  
  console.log(dataParsed);
  await res.send(dataParsed);
};

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
        "INSERT INTO Ensayos(idUsuario,datosEntrada,datosSalida,idLaboratorio) VALUES(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);",
        {
          replacements: {
            idUsuario: idUsuario,
            datosEntrada: JSON.stringify(datosEntrada),
            datosSalida: JSON.stringify(datosSalida),
            idLaboratorio: 1,
          },
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).json("Parámetros correctos");
    } catch (error) {
      console.error("-> ERROR poststroboscopicos:", error);
    }
  }
};

export { estroboscopicoController };
