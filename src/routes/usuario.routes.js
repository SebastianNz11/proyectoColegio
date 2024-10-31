import { Router } from "express";
import {
  getUsuario,
  getUsuarioById,
  insertUsuario,
  updateUsuario,
  deleteUsuario
} from "../controllers/usuario.controller.js";

const router = Router();

router.get("/usuarios", getUsuario);
router.get("/usuarios/:id_usuario", getUsuarioById);
router.post("/usuarios", insertUsuario);
router.put("/usuarios/:id_usuario", updateUsuario);
router.delete("/usuarios/:id_usuario", deleteUsuario);

export default router;
