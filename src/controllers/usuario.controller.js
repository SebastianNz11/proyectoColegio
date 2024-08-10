import { Usuario } from "../models/usuario.model.js";
import bcryptjs from 'bcryptjs'

//CONTROLLADOR PARA TRAER INFORMACION DE USUARIO
export const getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findAll();
    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo traer la informacion de los usuarios" });
  }
};

//CONTROLADOR PARA TRAER INFORMACION DE UN USUARIO
export const getUsuarioById = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const usuario = await Usuario.findOne({
      where: { id_usuario },
    });
    if (!usuario) {
      return res.status(404).json({ msg: "No se encontro el usuario" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo traer la informacion del usuario" });
  }
};

//CONTROLADOR PARA INSERTAR UN USUARIO
export const insertUsuario = async (req, res) => {
  try {
    const { nombres, apellidos, email, contrasenia, id_rol } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(contrasenia, salt);
    const usuario = await Usuario.create({
      nombres,
      apellidos,
      email,
      contrasenia: hashPassword,
      id_rol,
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo insertar el usuario" });
  }
};

//CONTROLADOR PARA ACTAULIZAR INFORMACION DE UN USUARIO
export const updateUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { nombres, apellidos, email, contrasenia, id_rol } = req.body;
    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) {
      return res.status(500).json({ msg: "Usuario no encontrado" });
    }
    (usuario.nombres = nombres),
      (usuario.apellidos = apellidos),
      (usuario.email = email),
      (usuario.contrasenia = contrasenia),
      (usuario.id_rol = id_rol);
    usuario.save();
    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo actualizar la informacion del usuario" });
  }
};

//CONTROLADOR PARA ELIMINAR UN USUARIO
export const deleteUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const usuario = await Usuario.destroy({
      where: { id_usuario },
    });
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.status(200).json({ msg: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el usuario" });
  }
};
