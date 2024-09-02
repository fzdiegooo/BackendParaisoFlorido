import { Usuario } from "../models/Usuario.js";
import { Op } from "sequelize";

export const VerifyUsuarioAuthorize = async (req, res, next) => {
    const { token } = req.headers["x-access-token"];
    try {  
        const id = verifyToken(token);
        const usuario = await Usuario.findOne(
            {
                where:{
                    id,
                    RolId: { 
                        [Op.ne]: 1  
                      }
                }
            }
        )
        if(usuario) next();
    } catch (error) {
          return res.status(400).json({ errorMessage:error });
    }
};
export const VerifyUsuarioNormal = async (req, res, next) => {
    const { token } = req.headers["x-access-token"];
    try {  
        const id = verifyToken(token);
        const usuario = await Usuario.findOne(
            {
                where:{
                    id
                }
            }
        )
        if(usuario) next();
    } catch (error) {
          return res.status(400).json({ errorMessage:error });
    }
};
function verifyToken(token){
    const decoded = jwt.verify(token,process.env.SECRETKEY);
    return decoded.id;
}







