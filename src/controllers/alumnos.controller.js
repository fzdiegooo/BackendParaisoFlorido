import { Usuario } from "../models/Usuario.js";
import { Grados } from "../models/Grados.js";
import { Secciones } from "../models/Secciones.js";

export const alumnosFiltros = async (req, res)=>{
    const { nombre, grado, seccion, alf = 'ASC'} = req.query;
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
        ['nombre', alf],  
    ]
})
    if(nombre){
        alumnos = alumnos.filter(alumno => alumno.nombre === nombre)
    }

    if(grado){
        alumnos = alumnos.filter(alumno => alumno.grado?.nombre === grado)
    }

    if(seccion){
        alumnos = alumnos.filter(alumno => alumno.seccion?.nombre === seccion)
    }

    res.json(alumnos)
}