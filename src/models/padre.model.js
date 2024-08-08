import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Padre = sequelize.define("padres", {
  id_padre: {
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
  id_rol: {
    type: DataTypes.INTEGER,
  },
});
