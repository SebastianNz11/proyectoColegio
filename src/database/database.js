import Sequelize from "sequelize";
import "dotenv/config";

//CONEXION A LA BASE DE DATOS POR MEDIO DE SEQUELIZE
export const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAMEDB,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORTDB,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);