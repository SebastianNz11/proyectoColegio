import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Grado = sequelize.define("grados", {
  id_grado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_grado: {
    type: DataTypes.STRING,
  },
});
