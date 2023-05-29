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
        newEnsayo.rapidezMotor          = ensayo.datosEntrada.rapidezMotor,
        newEnsayo.anguloMotor           = ensayo.datosEntrada.anguloMotor,
        newEnsayo.modificacionesDriver  = ensayo.datosEntrada.modificacionesDriver,
        newEnsayo.rapidezControlador    = ensayo.datosEntrada.rapidezControlador,
        newEnsayo.anguloControlador     = ensayo.datosEntrada.anguloControlador
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
        Estado,
        Posicion,
        Velocidad,
        Tiempo,
        Exitacion
    } = req.body

    if (
        Posicion < 0 || 
        Posicion > 100
    ) {
        res.status(400)
            .json("La posicion es menor a 0 o superior a x")
    } else if (Velocidad < 0) {//consulta por condiciones perro, por que la velocidad si puede ser negativa al igual que la posicion
        res.status(400)
            .json("La velocidad es negativa")
    } else if (Tiempo < 0) {
        res.status(400)
            .json("El tiempo no puede ser negativo")
    } else {

        const datosEntrada = {
            Estado:     Estado,
            Posicion:   Posicion,
            Velocidad:  Velocidad,
            Tiempo:     Tiempo,
            Exitacion:  Exitacion
        }

        const datosSalida = {
            //le dudo pero entiendo que no tendria salida
        }

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

            res.status(200).json({ msg: "Parámetros correctos. Guardado en DB" })
        } catch (error) {
            console.error("-> ERROR postEnsayoPosicion:", error)
            res.status(500).json({ msg: "Error en postEnsayoPosicion!" })
        }
    }
}

export { posicionController }
