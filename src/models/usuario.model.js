import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Usuario = sequelize.define("usuarios", {
  id_usuario: {
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
  email: {
    type: DataTypes.STRING,
  },
  contrasenia: {
    type: DataTypes.STRING,
  },
  id_rol: {
    type: DataTypes.INTEGER,
  },
});
