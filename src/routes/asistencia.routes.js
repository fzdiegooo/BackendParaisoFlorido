import { Router } from "express";
import { getAsistencia, registro } from "../controllers/asistencia.controller.js";
import { verifyToken } from "../middlewares/verifyRolAuth.js";

const router = Router();

router.get("/asistencia", getAsistencia)

router.post("/asistencia", registro)

export default router