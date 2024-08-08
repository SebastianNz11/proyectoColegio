import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Profesor = sequelize.define("profesores", {
  id_profesor: {
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
  id_curso: {
    type: DataTypes.INTEGER,
  },
  id_rol: {
    type: DataTypes.INTEGER,
  },
});
