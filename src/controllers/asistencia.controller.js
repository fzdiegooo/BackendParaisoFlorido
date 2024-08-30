
import { Usuario } from "../models/Usuario.js";
import { Asistencias } from "../models/Asistencias.js";
import { Op } from "sequelize";
export const registro = async (req, res)=>{
    const {id} = req.body;
    try {
        const usuarioEncontrado =  await Usuario.findOne({where:{id: id}})
        if(!usuarioEncontrado) return res.status(404).json({ message: "Alumno no encontrado" });

       
        const fechaActual = new Date(Date.now()).toISOString().split('T')[0];

        const asistencia = await Asistencias.findOne({
            where: {
                usuarioId: id,
                fecha: fechaActual
            }
        });
        
        console.log(asistencia);
        

        if(asistencia){
            const usuarioCreado = await asistencia.update({
                id:id,
                salida: new Date()
            });
            return res.status(200).json({message: "Registro Salida"});
        }else{
            const usuarioCreado = await Asistencias.create({
                fecha: fechaActual,
                ingreso: new Date(),
                salida: null,
                usuarioId:id
            });
            return res.status(200).json({message: "Registro Ingreso"});
        }

        
        
    } catch (error) {
        console.error("Error al registrar la asistencia:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}