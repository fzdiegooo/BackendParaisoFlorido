import { Router } from "express";
import { eliminarUsuario, obtenerTipoUsuarios } from "../controllers/usuarios.controller.js";

const router = Router()

router.delete("/usuario/:id", eliminarUsuario)
router.get("/usuario/:rol", obtenerTipoUsuarios)

export default router;