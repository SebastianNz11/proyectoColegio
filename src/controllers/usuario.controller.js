import bcrypt from 'bcryptjs';
import {generarContrasenia} from '../helpers/generarContrasenia.js'
import {sendEmail} from '../helpers/sendMail.js'
import { Usuario } from "../models/usuario.model.js";


//CONTROLADOR PARA TRAER INFORMACION DE LOS USUARIOS
export const getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findAll();
    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo traer la información de los usuarios" });
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
      return res.status(404).json({ msg: "No existe el usuario" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo traer la información del usuario" });
  }
};

//CONTROLADOR PARA INSERTAR UN USUARIO
export const insertUsuario = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      correo,
      id_rol
    } = req.body;

    // Generar una contraseña aleatoria
    const contrasenia = generarContrasenia();

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseniaEncriptada = await bcrypt.hash(contrasenia, salt);

    // Insertar el estudiante con la contraseña encriptada
    const usuario = await Usuario.create({
      nombres,
      apellidos,
      correo,
      contrasenia: contraseniaEncriptada,
      id_rol
    });

    // Enviar la contraseña sin encriptar al correo del estudiante
    await sendEmail(nombres, correo, contrasenia);

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "No se pudo insertar el usuario" });
  }
};

//CONTROLADOR PARA ACTUALIZAR INFORMACION DE UN USUARIO
export const updateUsuario = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      correo,
      contrasenia,
      id_rol
    } = req.body;
    const { id_usuario } = req.params;
    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({ msg: "No existe el usuario" });
    }
    usuario.nombres = nombres;
    usuario.apellidos = apellidos;
    usuario.correo = correo;
    usuario.contrasenia = contrasenia;
    usuario.id_rol = id_rol;
    usuario.save();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actualizar el usuario" });
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
      return res.status(404).json({ msg: "El usuario no existe" });
    }
    res.status(200).json({ msg: "Usuario eliminado con exito" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el usuario" });
  }
};
