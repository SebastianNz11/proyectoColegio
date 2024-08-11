import { Router } from "express";
import {
  getNota,
  getNotaById,
  insertNota,
  updateNota,
  deleteNota,
} from "../controllers/nota.controller.js";

const router = Router();

router.get("/notas", getNota);
router.get("/notas/:id_nota", getNotaById);
router.post("/notas", insertNota);
router.put("/notas/:id_nota", updateNota);
router.delete("/notas/:id_nota", deleteNota);

export default router;
