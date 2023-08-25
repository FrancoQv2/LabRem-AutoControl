import * as dotenv from "dotenv"
// Toma las variables configuradas por ENV dentro del docker-compose / dockerfile
// dotenv.config({ path: './.env'})
dotenv.config()

import expressServer from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import cors from "cors"

import https from "https"
import fs from "fs"
import { fileURLToPath } from "url"
import path from "path"

import { dbConnection } from "./configs/db.config.js"

import controlRouter from "./routes/control.routes.js"

// Configuracion de https
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const options = {
    key: fs.readFileSync(__dirname + "/certs/privkey.pem","ascii"),
    cert: fs.readFileSync(__dirname +"/certs/cert.pem","ascii")
}

const app = expressServer()
const PORT = 3000

//Necesitamos body-parser para formatear los post en express
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/api/control", controlRouter)

// app.use("/public-key", "id_rsa.pub") // formato x.509

// ---------------------------------------------------------------

const server = https.createServer(options, app)

server.listen(PORT, () => {
  console.log(`LabRem Control - Server on ${PORT}`)
})

export const db = dbConnection
