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
import routesProfesores from "./routes/profesor.router.js";
import routesMoras from "./routes/mora.routes.js";
import routesPagos from "./routes/pago.routes.js";
import routesNotas from "./routes/nota.routes.js";
import routesRecibirEmails from './routes/recibirInfoPorCorreo.routes.js'

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(routesRoles);
app.use(routesGrados);
app.use(routesUsuarios);
app.use(routesPadres);
app.use(routesEstudiantes);
app.use(routesCursos);
app.use(routesProfesores);
app.use(routesMoras);
app.use(routesPagos);
app.use(routesNotas);
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
