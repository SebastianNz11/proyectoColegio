import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Rol = sequelize.define("roles", {
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_rol: {
    type: DataTypes.STRING,
  },
});
