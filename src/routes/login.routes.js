import { Router } from "express";
import {
  login,
  verifyToken
} from "../controllers/login.controller.js";

const routes = Router();

routes.post("/login", login);
routes.post("/rutaProtegida", verifyToken);


export default routes;