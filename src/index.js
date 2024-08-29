import express from "express";
import { configDotenv } from "dotenv";
import alumnosRouter from "./routes/alumnos.routes.js";
import { sequelize } from "./database/database.js";
import "./models/Alumno.js"
const app = express()
configDotenv()
app.use(express.json())


async function main(){
    try {
        await sequelize.sync({force: true})
        app.listen(process.env.PORT,()=>{
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();

app.use("/api", alumnosRouter)