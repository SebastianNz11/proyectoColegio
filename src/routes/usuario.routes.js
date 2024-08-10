import { Router } from "express";
import {
  getUsuario,
  getUsuarioById,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuario.controller.js";

const routes = Router();

routes.get("/usuarios", getUsuario);
routes.get("/usuarios/:id_usuario", getUsuarioById);
routes.post("/usuarios", insertUsuario);
routes.put("/usuarios/:id_usuario", updateUsuario);
routes.delete("/usuarios/:id_usuario", deleteUsuario);

export default routes;
