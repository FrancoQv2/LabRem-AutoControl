import { db } from "../index.js"

const idLaboratorio = 2

const queries = {
    getEnsayosPosicion: "CALL sp_dameEnsayosPosicion();",
    postEnsayoPosicion: "CALL sp_crearEnsayo(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);"
}

const posicionController = {}

// -----------------------------------
// Métodos GET
// -----------------------------------

posicionController.getEnsayosPosicion = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getEnsayosSubmuestreo - ${JSON.stringify(req.params)}`)

    const data = await db.query(
        queries.getEnsayosPosicion
    )

    let dataParsed = []
    data.map((ensayo) => {
        const newEnsayo = {}
        newEnsayo.Usuario   = ensayo.idUsuario
        newEnsayo.Fecha     = ensayo.Fecha
        newEnsayo.Hora      = ensayo.Hora
        newEnsayo.anguloMotor           = ensayo.datosEntrada.anguloMotor,
        newEnsayo.rapidezMotor          = ensayo.datosEntrada.rapidezMotor,
        newEnsayo.modificacionesDriver  = ensayo.datosEntrada.modificacionesDriver,
        newEnsayo.anguloControlador     = ensayo.datosEntrada.anguloControlador,
        newEnsayo.rapidezControlador    = ensayo.datosEntrada.rapidezControlador
        dataParsed.push(newEnsayo)
    })

    await res.status(200).send(dataParsed)
}

// -----------------------------------
// Métodos POST
// -----------------------------------

posicionController.postEnsayoPosicion = (req, res) => {
    console.log(`-\n--> postEnsayoPosicion - ${JSON.stringify(req.body)}\n---`)

    const {
        idUsuario,
        anguloMotor,
        rapidezMotor,
        modificacionesDriver,
        anguloControlador,
        rapidezControlador
    } = req.body

    if (
        anguloMotor < -180 || 
        anguloMotor > 180
    ) {
        res.status(400)
            .json("El ángulo de salida del motor no está en el rango aceptado")
    } else if (
        rapidezMotor < 0
    ) {
        res.status(400)
            .json("La rapidez de cambio del motor es inválida")
    } else if (
        modificacionesDriver != "Ninguna" && 
        modificacionesDriver != "Retardos" && 
        modificacionesDriver != "No linealidades" && 
        modificacionesDriver != "Polos-ceros extras"
    ) {
        res.status(400)
            .json("La modificación del driver agregada es inválida")
    } else if (
        anguloControlador < -180 || 
        anguloControlador > 180
    ) {
        res.status(400)
            .json("El ángulo de salida del controlador no está en el rango aceptado")
    } else if (
        rapidezControlador < 0
    ) {
        res.status(400)
            .json("La rapidez de cambio del controlador es inválida")
    } else {
        const datosEntrada = {
            anguloMotor:            anguloMotor,
            rapidezMotor:           rapidezMotor,
            modificacionesDriver:   modificacionesDriver,
            anguloControlador:      anguloControlador,
            rapidezControlador:     rapidezControlador
        }

        const datosSalida = {}

        try {
            db.query(
                queries.postEnsayoPosicion,
                {
                    replacements: {
                        idUsuario:      idUsuario,
                        datosEntrada:   JSON.stringify(datosEntrada),
                        datosSalida:    JSON.stringify(datosSalida),
                        idLaboratorio:  idLaboratorio
                    }
                }
            )

            res.status(200).json("Parámetros correctos. Guardado en DB")
        } catch (error) {
            console.error("-> ERROR postEnsayoPosicion:", error)
            res.status(500).json("Falló el ensayo!")
        }
    }
}

export { posicionController }
