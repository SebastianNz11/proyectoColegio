import { Nota } from "../models/nota.model.js";

//CONTROLADOR PARA TRAER INFORMACION DE LAS NOTAS
export const getNota = async (req, res) => {
  try {
    const notas = await Nota.findAll();
    res.status(200).json(notas);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la informacion de las notas" });
  }
};

//CONTROLADOR PARA TRAER INFORMACION DE UNA NOTA
export const getNotaById = async (req, res) => {
  try {
    const { id_nota } = req.params;
    const notas = await Nota.findOne({
      where: { id_nota },
    });
    if (!notas) {
      return res.status(400).json({ msg: "No existe la nota" });
    }
    res.status(200).json(notas);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la informacion de la nota" });
  }
};

//CONTROLADOR PARA INSERTAR UNA NOTA
export const insertNota = async (req, res) => {
  try {
    const { id_estudiante, id_curso, bimestre, nota } = req.body;
    const notas = await Nota.create({
      id_estudiante,
      id_curso,
      bimestre,
      nota,
    });
    res.status(200).json(notas);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo insertar la nota" });
  }
};

//CONTROLADOR PARA ACTUALIZAR INFORMACION DE UNA NOTA
export const updateNota = async (req, res) => {
  try {
    const { id_nota } = req.params;
    const { id_estudiante, id_curso, bimestre, nota } = req.body;
    const notas = await Nota.findByPk(id_nota);
    if (!notas) {
      res.status(404).json({ msg: "No existe la nota" });
    }
    notas.id_estudiante = id_estudiante;
    notas.id_curso = id_curso;
    notas.bimestre = bimestre;
    notas.nota = nota;
    notas.save();
    res.status(200).json(notas);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actualizar la nota" });
  }
};

//CONTROLADOR PARA ELIMINAR UNA NOTA
export const deleteNota = async (req, res) => {
  try {
    const { id_nota } = req.params;
    const notas = await Nota.destroy({
      where: { id_nota },
    });
    if (!notas) {
      return res.status(404).json({ msg: "No existe la nota" });
    }
    res.status(200).json({ msg: "Nota eliminada con exito" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar la nota" });
  }
};
