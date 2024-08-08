import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Estudiante = sequelize.define("estudiantes", {
  id_estudiante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombres: {
    type: DataTypes.STRING,
  },
  apellidos: {
    type: DataTypes.STRING,
  },
  id_padre: {
    type: DataTypes.INTEGER,
  },
  id_rol: {
    type: DataTypes.INTEGER,
  },
  id_grado: {
    type: DataTypes.INTEGER,
  },
});
