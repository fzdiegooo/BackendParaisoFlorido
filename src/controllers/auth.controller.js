import { Usuario } from "../models/Usuario.js";
import { Rol } from "../models/Roles.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { correo, password } = req.body;
  try {
        const usuarioEncontrado = await Usuario.findOne({
            where:{correo}
        })
        if(!usuarioEncontrado) return res.status(404).json({ message: "User not found" });

        const resultado = await Usuario.comparePassword(password, usuarioEncontrado.password);

        if(resultado){
            const token = jwt.sign({  id: usuarioEncontrado.id  },  process.env.SECRETKEY,  {
                expiresIn: 86400,
            });
            return res.status(200).json({ token:  token, usuario: usuarioEncontrado  });
        }else{
            return res.status(400).json({ message: resultado});
        }
    } catch (error) {
        return res.status(400).json({ errorMessage:error });
    }
};

export const register = async (req, res) => {
  const { nombre, apellido, documento, sexo, edad, correo, password, rol, grado, seccion, telefono, turno } = req.body;
  try {
    const Rol_Encontrado = await Rol.findOne({ where: { nombre: rol } });
    console.log(Rol_Encontrado.id);
    try {
      const respuesta = await Usuario.create({
        nombre,
        apellido,
        documento,
        sexo,
        edad,
        correo,
        password,
        telefono,
        turno,
        RolId: Rol_Encontrado.id,
        gradoId: grado,
        seccionId: seccion
        
      });
      const token = jwt.sign({  id: respuesta.id  },  process.env.SECRETKEY,  {
        expiresIn: 86400,
      });
  
      return res.status(200).json({ token:  token, usuario: respuesta  });
    } catch (error) {
      console.log(error);
    }
    
  } catch (error) {
    return res.status(400).json({ ErrorMessage: error });
  }
};

