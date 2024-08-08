import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Mora = sequelize.define("moras", {
  id_mora: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pago: {
    type: DataTypes.INTEGER,
  },
  fecha_mora: {
    type: DataTypes.DATE,
  },
  monto_mora: {
    type: DataTypes.DECIMAL,
  },
});
