import { db } from "../index.js"

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

    // const data = await db.query(
    //     queries.getEnsayosSubmuestreo
    // )

    // let dataParsed = []
    // data.map((ensayo) => {
    //     const newEnsayo = {}
    //     newEnsayo.Usuario = ensayo.idUsuario
    //     newEnsayo.Fecha   = ensayo.Fecha
    //     newEnsayo.Hora    = ensayo.Hora
    //     newEnsayo.frecuenciaAgua = ensayo.datosEntrada.frecuenciaAgua
    //     newEnsayo.frecuenciaLuz  = ensayo.datosEntrada.frecuenciaLuz
    //     newEnsayo.caidaAgua      = ensayo.datosEntrada.caidaAgua
    //     dataParsed.push(newEnsayo)
    // })

    // await res.status(200).send(dataParsed)
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
            newEnsayo.frecuenciaAgua = ensayo.datosEntrada.frecuenciaAgua
            newEnsayo.frecuenciaLuz  = ensayo.datosEntrada.frecuenciaLuz
            newEnsayo.caidaAgua      = ensayo.datosEntrada.caidaAgua
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
        frecuenciaAgua,
        frecuenciaLuz,
        caidaAgua,
    } = req.body

    if (
        frecuenciaAgua < 0 || 
        frecuenciaAgua > 2147483647
    ) {
        res.status(400)
            .json("La frecuencia de caida del agua es inferior a 0 o superior a 2147483647 (32 bit)")
    } else if (
        frecuenciaLuz < 0 || 
        frecuenciaLuz > 2147483647
    ) {
        res.status(400)
            .json("La frecuencia de la luz es inferior a 0 o superior a 2147483647 (32 bit)")
    } else {
        const datosEntrada = {
            frecuenciaAgua: frecuenciaAgua,
            frecuenciaLuz:  frecuenciaLuz,
            caidaAgua:      caidaAgua,
        }
        
        const datosSalida = {
            FrecuenciaAparente: 10,
        }
        
        try {
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
