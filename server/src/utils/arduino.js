import axios from "axios"
import { delay } from "./delay.js"

const URL_ARDUINO = process.env.URL_ARDUINO

const GET  = 'GET /  HTTP/1.1'
const POST = 'POST / HTTP/1.1'

// curl -X GET http://10.0.255.11x -H 'Content-Type: text/plain' -d 'GET /  HTTP/1.1'
async function arduinoGET() {
    // const curlGET = `curl -X GET ${URL_ARDUINO} -H 'Content-Type: text/plain' -d '${GET} ${body}'`
    const curlGET = `curl -X GET ${URL_ARDUINO} -H 'Content-Type: text/plain' -d '${GET}'`

    return new Promise((resolve, reject) => {
        exec(curlGET, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                return
            }
            resolve(stdout)
        })
    })
}

// curl -X POST http://10.0.255.11x -H 'Content-Type: text/plain' -d 'POST / HTTP/1.1 {"Estado": [3,true,true],"Analogico": ["central",40,40]}'
async function arduinoPOST(kp, ki, kd, init, perturbar) {
    const body = `{"Estado": [1,1,1],"Constantes": [${kp},${ki},${kd}]},"Contro":[${init},${perturbar}]`
    const curlPOST = `curl -X POST ${URL_ARDUINO} -H 'Content-Type: text/plain' -d '${POST} ${body}'`

    return new Promise((resolve, reject) => {
        exec(curlPOST, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                return
            }
            resolve(stdout)
        })
    })
}

export { arduinoGET, arduinoPOST }
