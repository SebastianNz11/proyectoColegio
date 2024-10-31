import express from "express";
import { sequelize } from "./database/database.js";
import "dotenv/config";
import morgan from "morgan";
import "./models/relaciones.model.js";
import cors from 'cors';
import routesRoles from "./routes/rol.routes.js";
import routesGrados from "./routes/grado.routes.js";
import routesPadres from "./routes/padre.routes.js";
import routesEstudiantes from "./routes/estudiante.routes.js";
import routesCursos from "./routes/curso.routes.js";
import routesProfesores from "./routes/profesor.router.js";
import routesMoras from "./routes/mora.routes.js";
import routesPagos from "./routes/pago.routes.js";
import routesNotas from "./routes/nota.routes.js";
import routesRecibirEmails from './routes/recibirInfoPorCorreo.routes.js';
import routesUsuarios from './routes/usuario.routes.js';
import routesLogin from './routes/login.routes.js';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
  })
);

// Middleware para establecer encabezados de Content Security Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data:;");
  next();
});

// Middleware para registrar peticiones
app.use(morgan("dev"));

// Rutas de la API
app.use(routesRoles);
app.use(routesGrados);
app.use(routesPadres);
app.use(routesEstudiantes);
app.use(routesCursos);
app.use(routesProfesores);
app.use(routesMoras);
app.use(routesPagos);
app.use(routesNotas);
app.use(routesUsuarios);
app.use(routesLogin);
app.use(routesRecibirEmails);

const main = () => {
  app.listen(process.env.PORT, async () => {
    try {
      await sequelize.sync();
      console.log("La conexión se realizó de manera correcta");
      console.log("Escuchando en el puerto " + process.env.PORT || 4001);
    } catch (error) {
      console.error("No se pudo conectar la base de datos:", error);
    }
  });
};

main();
