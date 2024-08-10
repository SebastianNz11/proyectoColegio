import { Curso } from "../models/curso.model.js";

//CONTROLADOR PARA TRAER INFORMACION DE CURSOS
export const gerCurso = async (req, res) => {
  try {
    const curso = await Curso.findAll();
    res.status(200).json(curso);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la informacion de los cursos" });
  }
};

//CONTROLADOR PARA TRAER INFORMACION DE UN CURSO
export const getCursoById = async (req, res) => {
  try {
    const { id_curso } = req.params;
    const curso = await Curso.findOne({
      where: { id_curso },
    });
    if (!curso) {
      return res.status(400).json({ msg: "No existe el curso" });
    }
    res.status(200).json(curso);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la informacion del curso" });
  }
};

//CONTROLADOR PARA INSERTAR UN ESTUDIANTE
export const insertCurso = async (req, res) => {
  try {
    const { nombre_curso, descripcion, id_grado } = req.body;
    const curso = await Curso.create({
      nombre_curso,
      descripcion,
      id_grado,
    });
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo insertar el curso" });
  }
};

//CONTROLADOR PARA ACTUALIZAR INFORMACION DE UN ESTUDIANTE
export const updateCurso = async (req, res) => {
  try {
    const { id_curso } = req.params;
    const { nombre_curso, descripcion, id_grado } = req.body;
    const curso = await Curso.findByPk(id_curso);
    if (!curso) {
      res.status(404).json({ msg: "No existe el curso" });
    }
    curso.nombre_curso = nombre_curso;
    curso.descripcion = descripcion;
    curso.id_grado = id_grado;
    curso.save();
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actaulizar el curso" });
  }
};

//CONTROLADOR PARA ELIMINAR UN CURSO
export const deleteCurso = async (req, res) => {
  try {
    const { id_curso } = req.params;
    const curso = await Curso.destroy({
      where: { id_curso },
    });
    if (!curso) {
      return res.status(404).json({ msg: "No existe el curso" });
    }
    res.status(200).json({ msg: "Curso eliminado con exito" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el curso" });
  }
};
