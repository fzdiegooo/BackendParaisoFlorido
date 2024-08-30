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
            type:DataTypes.DATE
        },
        ingreso:{
            type: DataTypes.TIME
        },
        salida:{
            type: DataTypes.TIME
        }

    },
    {
        timestamps:false
    }
)

