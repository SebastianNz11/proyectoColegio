import express from "express";
import { sequelize } from "./database/database.js";
import "dotenv/config";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

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
