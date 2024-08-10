import { Router } from "express";
import {
  getGrado,
  getGradoById,
  insertGrado,
  updateGrado,
  deleteRoles,
} from "../controllers/grado.controller.js";

const routes = Router();

routes.get("/grados", getGrado);
routes.get("/grados/:id_grado", getGradoById);
routes.post("/grados", insertGrado);
routes.put("/grados/:id_grado", updateGrado);
routes.delete("/grados/:id_grado", deleteRoles);

export default routes;
