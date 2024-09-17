import { Usuario } from "../models/Usuario.js";
import { Rol } from "../models/Roles.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.userId = decoded.id 
    const usuario = await Usuario.findOne({
      where: { id: req.userId },
      include: Rol,
    });
    console.log(usuario);
    
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    next();
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};


