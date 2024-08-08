import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Pago = sequelize.define("pagos", {
  id_pago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_padre: {
    type: DataTypes.INTEGER,
  },
  fecha_pago: {
    type: DataTypes.DATE,
  },
  monto: {
    type: DataTypes.DECIMAL,
  },
  estado: {
    type: DataTypes.STRING,
  },
});
