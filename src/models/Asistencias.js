import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";
export const Asistencias = sequelize.define(
    "Asistencias",
    {
        id:{
            primaryKey: true,
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        fecha:{
            type:DataTypes.STRING
        },
        ingreso:{
            type: DataTypes.STRING
        },
        salida:{
            type: DataTypes.STRING
        }

    },
    {
        timestamps:false
    }
)

