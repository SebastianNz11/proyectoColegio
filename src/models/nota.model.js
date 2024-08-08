import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Nota = sequelize.define("notas", {
  id_nota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_estudiante: {
    type: DataTypes.INTEGER,
  },
  id_curso: {
    type: DataTypes.INTEGER,
  },
  bimestre: {
    type: DataTypes.INTEGER,
  },
  nota: {
    type: DataTypes.INTEGER,
  },
});
