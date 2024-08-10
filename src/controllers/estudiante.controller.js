import { Estudiante } from "../models/estudiante.model.js";

//CONTROLADOR PARA TRAER INFORMACION DE LOS ESTUDIANTES
export const getEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findAll();
    res.status(200).json(estudiante);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo traer la información de los estudiantes" });
  }
};

//CONTROLADOR PARA TRAER INFORMACION DE UN ESTUDIANTE
export const getEstudianteById = async (req, res) => {
  try {
    const { id_estudiante } = req.params;
    const estudiante = await Estudiante.findOne({
      where: { id_estudiante },
    });
    if (!estudiante) {
      return res.status(404).json({ msg: "No existe el estudiante" });
    }
    res.status(200).json(estudiante);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo traer la información del estudiante" });
  }
};

//CONTROLADOR PARA INSERTAR UN ESTUDIANTE
export const insertEstudiante = async (req, res) => {
  try {
    const { nombres, apellidos, id_padre, id_rol, id_grado } = req.body;
    const estudiante = await Estudiante.create({
      nombres,
      apellidos,
      id_padre,
      id_rol,
      id_grado,
    });
    res.status(200).json(estudiante);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo insertar el estudiante" });
  }
};

//CONTROLADOR PARA ACTUALIZAR INFORMACION DE UN ESTUDIANTE
export const updateEstudiante = async (req, res) => {
  try {
    const { nombres, apellidos, id_padre, id_rol, id_grado } = req.body;
    const { id_estudiante } = req.params;
    const estudiante = await Estudiante.findByPk(id_estudiante);
    if (!estudiante) {
      return res.status(404).json({ msg: "No existe el estudiante" });
    }
    estudiante.nombres = nombres;
    estudiante.apellidos = apellidos;
    estudiante.id_padre = id_padre;
    estudiante.id_rol = id_rol;
    estudiante.id_grado = id_grado;
    estudiante.save();
    res.status(200).json(estudiante);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actualizar el estudiante" });
  }
};

//CONTROLADOR PARA ELIMINAR UN USUARIO
export const deleteEstudiante = async (req, res) => {
  try {
    const { id_estudiante } = req.params;
    const estudiante = await Estudiante.destroy({
      where: { id_estudiante },
    });
    if (!estudiante) {
      return res.status(404).json({ msg: "El estudiante no existe" });
    }
    res.status(200).json({ msg: "Estudiante eliminado con exito" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el estudiante" });
  }
};
