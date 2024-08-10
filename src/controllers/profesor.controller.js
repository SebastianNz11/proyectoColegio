import { Profesor } from "../models/profesor.model.js";

//CONTROLADOR PARA TRAER INFORMACION DE PROFESORES
export const getProfesores = async (req, res) => {
  try {
    const profesor = await Profesor.findAll();
    res.status(200).json(profesor);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la informacion de los profesores" });
  }
};

//CONTROLADOR PARA TRAER INFORMACION DE UN PROFESOR
export const getProfesorById = async (req, res) => {
  try {
    const { id_profesor } = req.params;
    const profesor = await Profesor.findOne({
      where: { id_profesor },
    });
    if (!profesor) {
      return res.status(400).json({ msg: "No existe el profesor" });
    }
    res.status(200).json(profesor);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la informacion del profesor" });
  }
};

//CONTROLADOR PARA INSERTAR UN PROFESOR
export const insertProfesor = async (req, res) => {
  try {
    const { nombres, apellidos, id_curso, id_rol } = req.body;
    const profesor = await Profesor.create({
      nombres,
      apellidos,
      id_curso,
      id_rol,
    });
    res.status(200).json(profesor);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo insertar el profesor" });
  }
};

//CONTROLADOR PARA ACTUALIZAR INFORMACION DE UN PROFESOR
export const updateProfesor = async (req, res) => {
  try {
    const { id_profesor } = req.params;
    const { nombres, apellidos, id_curso, id_rol } = req.body;
    const profesor = await Profesor.findByPk(id_profesor);
    if (!profesor) {
      res.status(404).json({ msg: "No existe el profesor" });
    }
    profesor.nombres = nombres;
    profesor.apellidos = apellidos;
    profesor.id_curso = id_curso;
    profesor.id_rol = id_rol;
    profesor.save();
    res.status(200).json(profesor);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actaulizar el profesor" });
  }
};

//CONTROLADOR PARA ELIMINAR UN PROFESOR
export const deleteProfesor = async (req, res) => {
  try {
    const { id_profesor } = req.params;
    const profesor = await Profesor.destroy({
      where: { id_profesor },
    });
    if (!profesor) {
      return res.status(404).json({ msg: "No existe el profesor" });
    }
    res.status(200).json({ msg: "Profesor eliminado con exito" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el profesor" });
  }
};
