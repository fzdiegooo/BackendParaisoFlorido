import { Usuario } from "../models/Usuario.js";
import { Asistencias } from "../models/Asistencias.js";

export const registro = async (req, res) => {
    const { id } = req.body;

    try {
        const usuarioEncontrado = await Usuario.findOne({ where: { id: id } });
        if (!usuarioEncontrado) return res.status(404).json({ message: "Alumno no encontrado" });

        const fechaActual = new Date().toISOString().split('T')[0];

        const asistencia = await Asistencias.findOne({
            where: {
                usuarioId: id,
                fecha: fechaActual
            }
        });

        if (asistencia) {
            await asistencia.update({
                salida: new Date().toLocaleTimeString("es-PE")
            });
            return res.status(200).json({ message: "Registro de salida exitoso" });
        } else {
            await Asistencias.create({
                fecha: fechaActual,
                ingreso: new Date().toLocaleTimeString("es-PE"),
                salida: null,
                usuarioId: id
            });
            return res.status(200).json({ message: "Registro de ingreso exitoso" });
        }

    } catch (error) {
        console.error("Error al registrar la asistencia:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}