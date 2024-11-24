import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { configDotenv } from "dotenv";
import alumnosRouter from "./routes/alumnos.routes.js";
import asistenciaRouter from "./routes/asistencia.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import { sequelize } from "./database/database.js";
import "./models/Usuario.js"
import "./models/Asistencias.js"
import "./models/Grados.js"
import "./models/Roles.js"
import "./models/Secciones.js"
const app = express()
configDotenv()
app.use(cors())
app.use(express.json())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));

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
app.use("/api", userRouter)
app.use("/api", asistenciaRouter)
app.use("/api/auth", authRouter)