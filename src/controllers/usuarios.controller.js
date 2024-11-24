import { Usuario } from "../models/Usuario.js";

export const obtenerTipoUsuarios = async (req, res) => {
  const { rol } = req.params;
  try {
    const usuarios = await Usuario.findAll({where:{RolId: rol}});
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
}

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ message: "User not found" });

    await usuario.destroy();
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
}

export const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, documento, sexo, edad, correo, password } = req.body;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).json({ message: "User not found" });
    
        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.documento = documento;
        usuario.sexo = sexo;
        usuario.edad = edad;
        usuario.correo = correo;
        usuario.password = password;
        await usuario.save();
    
        return res.status(200).json({ message: "User updated" });
    } catch (error) {
        return res.status(400).json({ errorMessage: error });
    }
}