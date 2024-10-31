import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.model.js";
import { Estudiante } from "../models/estudiante.model.js";
import { Padre } from "../models/padre.model.js";
import { Profesor } from "../models/profesor.model.js";
const SECRET_KEY = "tu_clave_secreta";

export const login = async (req, res) => {
  const { correo, contrasenia } = req.body;

  try {
    // Buscar en la tabla Usuarios
    let usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      // Si no es usuario, buscar en la tabla Estudiantes
      usuario = await Estudiante.findOne({ where: { correo } });
    }

    if (!usuario) {
      // Si no es estudiante, buscar en la tabla Padres
      usuario = await Padre.findOne({ where: { correo } });
    }

    if (!usuario) {
      // Si no es padre, buscar en la tabla Profesores
      usuario = await Profesor.findOne({ where: { correo } });
    }

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comparar la contraseña
    const validPassword = await bcrypt.compare(
      contrasenia,
      usuario.contrasenia
    );
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      {
        id:
          usuario.id_usuario ||
          usuario.id_estudiante ||
          usuario.id_padre ||
          usuario.id_profesor,
        rol: usuario.id_rol,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Enviar el token, el rol y el id en la respuesta
    return res.json({
      token,
      id:
        usuario.id_usuario ||
        usuario.id_estudiante ||
        usuario.id_padre ||
        usuario.id_profesor,
      rol: usuario.id_rol,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

//SEGURIDAD DE RUTAS
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ error: "Acceso denegado, token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
