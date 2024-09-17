import { Router } from "express";
import { alumnosFiltros } from "../controllers/alumnos.controller.js";

const router = Router()

router.get("/alumnos", alumnosFiltros)

export default router;