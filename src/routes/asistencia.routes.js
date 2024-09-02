import { Router } from "express";
import { getAsistencia, registro } from "../controllers/asistencia.controller.js";
import { VerifyUsuarioAuthorize } from "../middlewares/verifyRolAuth.js";

const router = Router();

router.get("/asistencia",VerifyUsuarioAuthorize, getAsistencia)

router.post("/asistencia", registro)

export default router