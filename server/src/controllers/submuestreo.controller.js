import { db } from "../index.js"
import { arduinoPOST, arduinoGET } from "../utils/arduino.js"


const idLaboratorio = 1

const queries = {
    getEnsayosSubmuestreo: "CALL sp_dameEnsayosSubmuestreo();",
    postEnsayoSubmuestreo: "CALL sp_crearEnsayo(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);"
}

const submuestreoController = {}

// -----------------------------------
// Métodos GET
// -----------------------------------

submuestreoController.getEnsayosSubmuestreo = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getEnsayosSubmuestreo - ${JSON.stringify(req.params)}`)
    
    let dataParsed = []

    try {        
        const data = await db.query(
            queries.getEnsayosSubmuestreo
        )
    
        data.map((ensayo) => {
            const newEnsayo = {}
            newEnsayo.Usuario = ensayo.idUsuario
            newEnsayo.Fecha   = ensayo.Fecha
            newEnsayo.Hora    = ensayo.Hora
            newEnsayo.kp = ensayo.datosEntrada.kp
            newEnsayo.ki = ensayo.datosEntrada.ki
            newEnsayo.kd = ensayo.datosEntrada.kd
            newEnsayo.init = ensayo.datosEntrada.init
            newEnsayo.perturbar = ensayo.datosEntrada.perturbar
            dataParsed.push(newEnsayo)
        })
    
        await res.status(200).send(dataParsed)
    } catch (error) {
        res.status(404).send(dataParsed)
    }
}

// -----------------------------------
// Métodos POST
// -----------------------------------

submuestreoController.postEnsayoSubmuestreo = async (req, res) => {
    console.log(`-\n--> postEnsayoSubmuestreo - ${JSON.stringify(req.body)}\n---`)

    const {
        idUsuario,
        kp,
        ki,
        kd,
        init,
        perturbar
    } = req.body

    if (
        kp < 0
    ) {
        res.status(400)
            .json("Kp es inferior a 0")
    } else if (
        ki < 0
    ) {
        res.status(400)
            .json("Ki es inferior a 0")
    } else if (
        kd < 0
    ) {
        res.status(400)
            .json("Kd es inferior a 0")
    } else if (
        init != 0 && init != 1
    ) {
        res.status(400)
            .json("Init/Stop es incorrecto")
    } else if (
        perturbar != 0 && perturbar != 1
    ) {
        res.status(400)
            .json("Perturbar es incorrecto")
    } else {
        const datosEntrada = {
            kp: kp,
            ki: ki,
            kd: kd,
            init: init,
            perturbar: perturbar
        }
        
        const datosSalida = { }
        
        try {
            console.log("EN EL TRY");
            let resPostArduino = await arduinoPOST(kp, ki, kd)
            console.log(resPostArduino)
            
            const resArduino = await arduinoGET()
            console.log(resArduino)

            await db.query(
                queries.postEnsayoSubmuestreo,
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
            console.error("-> ERROR postEnsayoSubmuestreo:", error)
            res.status(500).json("Falló el ensayo!")
        }

    }
}

export { submuestreoController }
