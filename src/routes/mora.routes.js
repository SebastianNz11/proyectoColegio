import { Router } from "express";
import {
  getMora,
  getMoraById,
  insertMora,
  updateMora,
  deleteMora,
} from "../controllers/mora.controller.js";

const router = Router();

router.get("/moras", getMora);
router.get("/moras/:id_mora", getMoraById);
router.post("/moras", insertMora);
router.put("/moras/:id_mora", updateMora);
router.delete("/moras/:id_mora", deleteMora);

export default router;
