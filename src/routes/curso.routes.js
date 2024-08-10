import { Router } from "express";
import {
  gerCurso,
  getCursoById,
  insertCurso,
  updateCurso,
  deleteCurso,
} from "../controllers/curso.controller.js";

const router = Router();

router.get("/cursos", gerCurso);
router.get("/cursos/:id_curso", getCursoById);
router.post("/cursos", insertCurso);
router.put("/cursos/:id_curso", updateCurso);
router.delete("/cursos/:id_curso", deleteCurso);

export default router;
