import { Router } from "express";
import { alumnosAsistencias, alumnosFiltros } from "../controllers/alumnos.controller.js";

const router = Router()

router.get("/alumnos", alumnosFiltros)

router.get("/alumnos/:id", alumnosAsistencias)

export default router;