import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Curso = sequelize.define("cursos", {
  id_curso: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_curso: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  id_grado: {
    type: DataTypes.INTEGER,
  },
});
