import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const controlController = {};

/**
 * -----------------------------------------------------
 * Function - getLaboratorios
 * -----------------------------------------------------
 */
controlController.getLaboratorios = async (req, res) => {
  const response = await sequelize.query(
    "SELECT * FROM Laboratorios;",
    {
      type: QueryTypes.SELECT,
    }
    );
  console.log(typeof response);
  console.log(response);

  await res.send(response);
};

/**
 * -----------------------------------------------------
 * Function - getLaboratorioById
 * -----------------------------------------------------
 */
controlController.getLaboratorioById = async (req, res) => {
  const { idLaboratorio } = req.params;

  const response = await sequelize.query(
    "SELECT area, nombre, imagen, descripcion FROM Laboratorios WHERE idLaboratorio = :idLaboratorio;",
    {
      replacements: {
          idLaboratorio: idLaboratorio
      },
      type: QueryTypes.SELECT,
    }
  );
  
  await res.send(response[0]);
};


/**
 * -----------------------------------------------------
 * Function - getEnsayosUsuario
 * -----------------------------------------------------
 */
controlController.getEnsayosUsuario = async (req, res) => {
  console.log(req.params);
    
  const { idLaboratorio, idUsuario } = req.params;

  const response = await sequelize.query(
    "SELECT DATE(fechaHora) AS Fecha, TIME(fechaHora) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = :idLaboratorio AND idUsuario = :idUsuario;",
    {
      replacements: {
        idLaboratorio: idLaboratorio,
        idUsuario: idUsuario,
      },
      type: QueryTypes.SELECT,
    }
  );

  let dataParsed = [];
  
  if (idLaboratorio == 1) {
    response.map((ensayo)=>{
      const newEnsayo = {}
      newEnsayo.Fecha = ensayo.Fecha
      newEnsayo.Hora = ensayo.Hora
      newEnsayo.FrecuenciaCaidaAgua = ensayo.datosEntrada.FrecuenciaCaidaAgua
      newEnsayo.FrecuenciaLuz = ensayo.datosEntrada.FrecuenciaLuz
      newEnsayo.CaidaAgua = ensayo.datosEntrada.CaidaAgua
      dataParsed.push(newEnsayo)
    })
  } else if (idLaboratorio == 2) {
    response.map((ensayo)=>{
      const newEnsayo = {}
      newEnsayo.Fecha = ensayo.Fecha
      newEnsayo.Hora = ensayo.Hora
      newEnsayo.distanciaLente1 = ensayo.datosEntrada.distanciaLente1
      newEnsayo.distanciaLenteLente = ensayo.datosEntrada.distanciaLenteLente
      newEnsayo.distanciaPantalla = ensayo.datosEntrada.distanciaPantalla
      dataParsed.push(newEnsayo)
    })
  }
  console.log("--------------------------------");
  console.log(response);
  console.log("--------------------------------");
  
  await res.send(JSON.stringify(dataParsed));
};

export { controlController };
