import { Router } from "express";
import {
  getRoles,
  getRolesById,
  insertRoles,
  updateRoles,
  deleteRoles,
} from "../controllers/rol.controller.js";

const routes = Router();

routes.get("/roles", getRoles);
routes.get("/roles/:id_rol", getRolesById);
routes.post("/roles", insertRoles);
routes.put("/roles/:id_rol", updateRoles);
routes.delete("/roles/:id_rol", deleteRoles);

export default routes;
