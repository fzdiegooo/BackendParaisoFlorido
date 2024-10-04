import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
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
        },
        estado:{
            type: DataTypes.STRING
        }

    },
    {
        timestamps:false
    }
)

