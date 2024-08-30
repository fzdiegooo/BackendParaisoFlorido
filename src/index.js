import express from "express";
import { configDotenv } from "dotenv";
import alumnosRouter from "./routes/alumnos.routes.js";
import asistenciaRouter from "./routes/asistencia.routes.js";
import { sequelize } from "./database/database.js";
import "./models/Usuario.js"
import "./models/Asistencias.js"
import "./models/Grados.js"
import "./models/Roles.js"
import "./models/Secciones.js"
const app = express()
configDotenv()
app.use(express.json())


async function main(){
    try {
        await sequelize.sync({alter: true})
        app.listen(process.env.PORT,()=>{
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();

app.use("/api", alumnosRouter)
app.use("/api", asistenciaRouter)