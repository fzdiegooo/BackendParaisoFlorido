import { Router } from "express";
import { registro } from "../controllers/asistencia.controller.js";
const router = Router();

router.post("/asistencia", registro)

export default router