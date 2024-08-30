import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Secciones = sequelize.define(
    "Secciones",
    {
        id:{
            primaryKey: true,
            type:DataTypes.INTEGER,
            autoIncrement: true
        },
        nombre:{
            type:DataTypes.STRING
        }
    },
    {
        timestamps:false
    }
)