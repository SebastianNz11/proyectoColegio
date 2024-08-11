import { Router } from "express";
import { postEmail } from "../controllers/recibirInfoPorCorreo.controller.js";

const router = Router();

router.post("/correo", postEmail);

export default router;
