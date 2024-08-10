import { Router } from "express";
import {
  getPadres,
  getPadresById,
  insertPadres,
  updatePadre,
  deletePadres,
} from "../controllers/padre.controller.js";

const routes = Router();

routes.get("/padres", getPadres);
routes.get("/padres/:id_padre", getPadresById);
routes.post("/padres", insertPadres);
routes.put("/padres/:id_padre", updatePadre);
routes.delete("/padres/:id_padre", deletePadres);

export default routes;
