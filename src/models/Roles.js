import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Rol = sequelize.define(
    "Rol",
    {
        id:{
            primaryKey: true,
            type:DataTypes.INTEGER
        },
        nombre:{
            type:DataTypes.STRING
        }
    },
    {
        timestamps:false
    }
)