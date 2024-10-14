import bcrypt from 'bcryptjs';
import {generarContrasenia} from '../helpers/generarContrasenia.js'
import {sendEmail} from '../helpers/sendMail.js'
import { Padre } from "../models/padre.model.js";

//CONTROLADOR PARA TRAER INFORMACION DE UN PADRE
export const getPadres = async (req, res) => {
  try {
    const padres = await Padre.findAll();
    res.status(200).json(padres);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener los padres" });
  }
};

//CONTROLADOR PARA TRAER INFORMACION DE UN PADRE
export const getPadresById = async (req, res) => {
  try {
    const { id_padre } = req.params;
    const padres = await Padre.findOne({
      where: { id_padre },
    });
    if (!padres) {
      return res.status(404).json({ msg: "No se encontró el padre" });
    }
    res.status(200).json(padres);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener el padre" });
  }
};

//CONTROLADOR PARA INSERTAR UN PADRE
export const insertPadres = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      correo,
      id_rol,
    } = req.body;

    const contrasenia = generarContrasenia();

    const salt = await bcrypt.genSalt(10);
    const contraseniaEncriptada = await bcrypt.hash(contrasenia, salt);
    const padres = await Padre.create({
      nombres,
      apellidos,
      correo,
      contrasenia: contraseniaEncriptada,
      id_rol,
    });
    await sendEmail(nombres, correo, contrasenia);

    res.status(200).json(padres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "No se pudo insertar el padre" });
  }
};

//CONTROLADOR PARA ACTUALIZAR DATOS DEL PADRE
export const updatePadre = async (req, res) => {
  try {
    const { id_padre } = req.params;
    const { nombres, apellidos, correo, contrasenia, id_rol } = req.body;
    const padres = await Padre.findByPk(id_padre);
    if (!padres) {
      return res.status(404).json({ msg: "No se encontró el padre" });
    }
    padres.nombres = nombres;
    padres.apellidos = apellidos;
    padres.correo = correo;
    padres.contrasenia = contrasenia;
    padres.id_rol = id_rol;
    padres.save();
    res.status(200).json(padres);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actaulizar el padre" });
  }
};

//CONTROLADOR PARA ELIMINAR UN PADRE
export const deletePadres = async (req, res) => {
  try {
    const { id_padre } = req.params;
    const padres = await Padre.destroy({
      where: { id_padre },
    });
    if (!padres) {
      return res.status(404).json({ msg: "No se encontró el padre" });
    }
    res.status(200).json({ msg: "Padre eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el padre" });
  }
};
