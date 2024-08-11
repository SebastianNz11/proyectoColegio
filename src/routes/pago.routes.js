import { Router } from "express";
import {
  getPago,
  getPagoById,
  insertPago,
  updatePago,
  deletePago,
} from "../controllers/pago.controller.js";

const router = Router();

router.get("/pagos", getPago);
router.get("/pagos/:id_pago", getPagoById);
router.post("/pagos", insertPago);
router.put("/pagos/:id_pago", updatePago);
router.delete("/pagos/:id_pago", deletePago);

export default router;
