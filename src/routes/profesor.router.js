import Router from "express";
import {
  getProfesores,
  getProfesorById,
  insertProfesor,
  updateProfesor,
  deleteProfesor,
} from "../controllers/profesor.controller.js";

const router = Router();

router.get("/profesores", getProfesores);
router.get("/profesores/:id_profesor", getProfesorById);
router.post("/profesores", insertProfesor);
router.put("/profesores/:id_profesor", updateProfesor);
router.delete("/profesores/:id_profesor", deleteProfesor);

export default router;
