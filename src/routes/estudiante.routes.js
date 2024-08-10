import { Router } from "express";
import {
  getEstudiante,
  getEstudianteById,
  insertEstudiante,
  updateEstudiante,
  deleteEstudiante,
} from "../controllers/estudiante.controller.js";

const router = Router();

router.get("/estudiantes", getEstudiante);
router.get("/estudiantes/:id_estudiante", getEstudianteById);
router.post("/estudiantes", insertEstudiante);
router.put("/estudiantes/:id_estudiante", updateEstudiante);
router.delete("/estudiantes/:id_estudiante", deleteEstudiante);

export default router;
