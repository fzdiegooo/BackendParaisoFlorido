import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Grados } from "./Grados.js";
import { Secciones } from "./Secciones.js";
import { Asistencias } from "./Asistencias.js";
import { Rol } from "./Roles.js";
import bcrypt from "bcryptjs";

export const Usuario = sequelize.define(
    "Usuario",
    {
        id:{
            primaryKey: true,
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        nombre:{
            type:DataTypes.STRING
        },
        documento:{
            type: DataTypes.STRING(12),
            unique: true,
            allowNull: true
        },
        sexo:{
            type:DataTypes.STRING
        },
        edad:{
            type:DataTypes.INTEGER
        },
        correo:{
            type:DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        password:{
            type:DataTypes.STRING
        }
    },
    {
        timestamps:false,
        hooks:{
            beforeCreate: async(usuario, options)=>{
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt); 
            }
        }
    }

)

Usuario.comparePassword = async(password, hashPassword)=>{
    return await bcrypt.compare(password,hashPassword)
}

//  TIPO DE DOCUMENTO | NÚMERO DE DOCUMENTO | VALIDADO CON RENIEC | CÓDIGO DEL ESTUDIANTE | APELLIDO PATERNO | APELLIDO MATERNO | NOMBRES | SEXO | FECHA DE NACIMIENTO | EDAD (AL 31 DE MARZO) | ESTADO DE MATRICULA | TIPO DE VACANTE

//realacion uno a muchos Grado
Grados.hasMany(Usuario);
Usuario.belongsTo(Grados);

//realacion uno a muchos Grado
Secciones.hasMany(Usuario);
Usuario.belongsTo(Secciones);

Rol.hasMany(Usuario);
Usuario.belongsTo(Rol);

Usuario.hasMany(Asistencias, {
    foreignKey: 'usuarioId',
    sourceKey: 'id'
});

Asistencias.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    targetKey: 'id'
});


