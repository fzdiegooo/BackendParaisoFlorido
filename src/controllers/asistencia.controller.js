import { Alumno } from "../models/Alumno.js";

export const asistencia = async (req, res)=>{
    const {id} = req.body;
    try {
        const alumnoEncontrado =  Alumno.findOne({where:{id: id}})
        if(!alumnoEncontrado) return res.status(404).json({ message: "Alumno no encontrado" });
        
    } catch (error) {
        
    }
}