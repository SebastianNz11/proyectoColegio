import express from "express";
import { sequelize } from "./database/database.js";
import "dotenv/config";
import morgan from "morgan";
import "./models/relaciones.model.js";
import routesRoles from "./routes/rol.routes.js";
import routesGrados from "./routes/grado.routes.js";
import routesUsuarios from "./routes/usuario.routes.js";
import routesPadres from "./routes/padre.routes.js";
import routesEstudiantes from "./routes/estudiante.routes.js";
import routesCursos from "./routes/curso.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(routesRoles);
app.use(routesGrados);
app.use(routesUsuarios);
app.use(routesPadres);
app.use(routesEstudiantes);
app.use(routesCursos);

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
