import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Alumno = sequelize.define(
    "Alumno",
    {
        id:{
            primaryKey: true,
            type:DataTypes.STRING
        },
        nombre:{
            type:DataTypes.STRING
        },
        apellido:{
            type:DataTypes.STRING
        },
        grado:{
            type:DataTypes.STRING
        },
        correo:{
            type:DataTypes.STRING
        }
    },
    {
        timestamps:false
    }
)