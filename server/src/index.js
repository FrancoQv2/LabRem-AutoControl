import * as dotenv from "dotenv"
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

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/api/control", controlRouter)

// ---------------------------------------------------------------

const server = https.createServer(options, app)

server.listen(PORT, () => {
  console.log(`LabRem Control - Server on ${PORT}`)
})

export const db = dbConnection
