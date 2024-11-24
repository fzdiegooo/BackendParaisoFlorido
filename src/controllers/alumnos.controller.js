import { Usuario } from "../models/Usuario.js";
import { Grados } from "../models/Grados.js";
import { Secciones } from "../models/Secciones.js";
import { Asistencias } from "../models/Asistencias.js";

export const alumnosFiltros = async (req, res)=>{
    const { apellido, grado, seccion, alf = 'ASC'} = req.query;
    //const alumnos = await Usuario.findAll({where:{RolId: 1}})

    let alumnos = await Usuario.findAll({where:{
        RolId: 1
    },
    include: [
        {
            model: Grados,
            as: "grado",
            attributes: ['nombre'], 
        },
        {
            model: Secciones,
            as: "seccion",
            attributes: ['nombre'],  
        }
    ],
    order: [
        
        ['GradoId', 'ASC'],       
        ['SeccionId', 'ASC'],
        ['apellido', alf],  
    ]
})
    if(apellido){
        alumnos = alumnos.filter(alumno => alumno.apellido === apellido)
    }

    if(grado){
        alumnos = alumnos.filter(alumno => alumno.grado?.nombre === grado)
    }

    if(seccion){
        alumnos = alumnos.filter(alumno => alumno.seccion?.nombre === seccion)
    }

    res.json(alumnos)
}


export const alumnosAsistencias = async(req,res)=>{
    const {id} = req.params;
    try {
        const result = await Usuario.findAll({where: {id},include: [{model: Asistencias},{model: Secciones, as: "seccion"}]})

        const respuesta = result.map((res) => ({
            id: res.id,
            nombre: res.nombre, 
            apellido: res.apellido,
            documento: res.documento,
            sexo: res.sexo,
            edad: res.edad,
            gradoId: res.gradoId,
            nombreSeccion: res.seccion.nombre,
            asistencias: res.Asistencias
          }));

        res.json(respuesta[0]);
    } catch (error) {
        res.status(500).json({message: error})
    }

    
    
}

