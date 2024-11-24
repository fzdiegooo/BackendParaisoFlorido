import { Usuario } from "../models/Usuario.js";
import { Asistencias } from "../models/Asistencias.js";
import moment from "moment/moment.js";
import "moment/locale/es.js";
import { Secciones } from "../models/Secciones.js";
import  {Resend}  from 'resend';
import dotenv from 'dotenv';

dotenv.config();

export const getAsistencia = async (req, res) => {
  try {
    const { fecha } = req.query; // Fecha que se recibe desde la consulta
    let listaAsistencia = await Asistencias.findAll({
      include: [
        {
          model: Usuario,
          include: [{ model: Secciones, as: "seccion" }],
        },
      ],
    });

    if (fecha) {
      console.log(fecha);

      listaAsistencia = listaAsistencia.filter((asistencia) => {
        const fechaAsistencia = moment(asistencia.fecha, "DD-MM-YYYY").format(
          "DD/MM/YYYY"
        );
        const fechaQuery = moment(fecha, "YYYY-MM-DD").format("DD/MM/YYYY");
        return fechaAsistencia === fechaQuery;
      });
    }

    // Mapear la respuesta para devolver solo los campos necesarios
    const respuesta = listaAsistencia.map((asistencia) => ({
      id: asistencia.id,
      fecha: asistencia.fecha, // Formatear fecha antes de enviar
      ingreso: asistencia.ingreso,
      salida: asistencia.salida,
      nombreAlumno: asistencia.Usuario.nombre,
      apellidoAlumno: asistencia.Usuario.apellido,
      gradoId: asistencia.Usuario.gradoId,
      nombreSeccion: asistencia.Usuario.seccion.nombre,
    }));

    // Enviar la respuesta personalizada
    res.json(respuesta);
  } catch (error) {
    console.error("Error al obtener la lista de asistencias:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const registro = async (req, res) => {
  const { id } = req.body;

  try {
    //Busqueda usuario
    const usuarioEncontrado = await Usuario.findOne({ where: { id: id } });
    if (!usuarioEncontrado)
      return res.status(404).json({ message: "Alumno no encontrado" });

    const fechaActual = moment().format("DD-MM-YYYY");
    const horaActual = moment().tz("America/Lima");
    const nombreCompleto = `${usuarioEncontrado.nombre+" "+usuarioEncontrado.apellido}`
    const hora = `${horaActual.tz("America/Lima").format("hh:mm A")}`

    const asistencia = await Asistencias.findOne({
      where: { usuarioId: id, fecha: fechaActual },
    });

    if (asistencia) {
      // Calcular la diferencia en minutos desde el ingreso hasta el momento actual
      const diferenciaMinutos = horaActual.diff(
        moment.tz(
          `${fechaActual} ${asistencia.ingreso}`,
          "DD-MM-YYYY hh:mm A",
          "America/Lima"
        ),
        "minutes"
      );

      if (asistencia.fecha == fechaActual && asistencia.salida != null)
        return res.status(500).json({ message: "Ya existe este registro" });

      // Verificar si han pasado más de 15 minutos desde el registro de ingreso
      if (diferenciaMinutos >= 2) {
        // Actualizar el registro de salida
        await asistencia.update({
          salida: horaActual.tz("America/Lima").format("hh:mm A"),
        });

        let estado = "salio del colegio"

        res.render('email-template',{nombreCompleto, estado, hora},async (err,html)=>{
          if(err) return res.status(500).send('Error al enviar el correo.');

          const data = await resend.emails.send({
            from: 'Colegio Paraiso Florido <paraisoflorido@diegobulnesruiz.lat>',
            to: `${usuarioEncontrado.correo}`,
            subject: 'Asistencia',
            html: html
          });
          console.log(data);

        })

        return res.status(200).json({ message: "Registro de salida exitoso" });
      } else {

        return res.status(422).json({message: "Deben pasar al menos 15 minutos para registrar la salida",});
      }
    } else {
      // Crear nuevo registro de ingreso
      await Asistencias.create({
        fecha: fechaActual,
        ingreso: horaActual.tz("America/Lima").format("hh:mm A"),
        salida: null,
        usuarioId: id,
      });

      let estado = "ingreso al colegio"

      res.render('email-template',{nombreCompleto, estado, hora}, async(err,html)=>{
        if(err) return res.status(500).send('Error al enviar el correo.'+err);

        const data = await resend.emails.send({
          from: 'Colegio Paraiso Florido <paraisoflorido@diegobulnesruiz.lat>',
          to: `${usuarioEncontrado.correo}`,
          subject: 'Asistencia',
          html: html
        });
        console.log(data);

      })

      return res.status(201).json({ message: "Registro de ingreso exitoso" });
    }
  } catch (error) {
    console.error("Error al registrar la asistencia:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


