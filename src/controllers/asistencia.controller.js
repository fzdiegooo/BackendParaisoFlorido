import { Usuario } from "../models/Usuario.js";
import { Asistencias } from "../models/Asistencias.js";
import moment from "moment/moment.js";
import 'moment/locale/es.js';



export const getAsistencia = async(req, res)=>{
    try{
        const listaAsistencia = await Asistencias.findAll({include:[{
            model: Usuario,
            attributes:["nombre"]
        }]});
        res.send(listaAsistencia)
    }catch(error){
        console.log(error);
    }
}



export const registro = async (req, res) => {
    const { id } = req.body;

    try {
        //Busqueda usuario
        const usuarioEncontrado = await Usuario.findOne({ where: { id: id } });
        if (!usuarioEncontrado) return res.status(404).json({ message: "Alumno no encontrado" });

        const fechaActual = moment().format('YYYY-MM-DD');
        const horaActual = moment().format('HH:mm:ss')

        const asistencia = await Asistencias.findOne({
            where: {usuarioId: id, fecha: fechaActual}
        });

        if (asistencia) {
            // Calcular la diferencia en minutos desde el ingreso hasta el momento actual
            const diferenciaMinutos = moment().diff(moment(`${fechaActual} ${asistencia.ingreso}`), 'minutes');

            // Verificar si han pasado más de 15 minutos desde el registro de ingreso
            if (diferenciaMinutos >= 15) {
                // Actualizar el registro de salida
                await asistencia.update({
                    salida: horaActual
                });
                return res.status(200).json({ message: "Registro de salida exitoso" });
            } else {
                return res.status(422).json({ message: "Deben pasar al menos 15 minutos para registrar la salida" });
            }
        } else {
            // Crear nuevo registro de ingreso
            await Asistencias.create({
                fecha: fechaActual,
                ingreso: horaActual,
                salida: null,
                usuarioId: id
            });
            return res.status(201).json({ message: "Registro de ingreso exitoso" });
        }

    } catch (error) {
        console.error("Error al registrar la asistencia:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}



