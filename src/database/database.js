import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("colegio_paraiso_florido","root", "DBRubik1",{
    host: "localhost",
    dialect: "mysql"
})