import { Grado } from "../models/grado.model.js";

//CONTROLADOR PARA TRAER INFORMACION DE GRADOS
export const getGrado = async (req, res) => {
  try {
    const grado = await Grado.findAll();
    res.status(200).json(grado);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la informacion de los grados" });
  }
};

//CONTROLADOR PARA OBTENER INFORMACION DE UN GRADO
export const getGradoById = async (req, res) => {
  try {
    const { id_grado } = req.params;
    const grado = await Grado.findOne({
      where: { id_grado },
    });
    if (!grado) {
      return res.status(404).json({ msg: "No se pudo obtener el grado" });
    }
    res.status(200).json(grado);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obttener el grado" });
  }
};

//CONTROLADOR PARA INSERTAR UN GRADO
export const insertGrado = async (req, res) => {
  try {
    const { nombre_grado } = req.body;
    const grado = await Grado.create({
      nombre_grado,
    });
    res.status(200).json(grado);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo insertar el grado" });
  }
};

//CONTROLADOR PARA ACTUALIZAR DATOS DE UN GRADO
export const updateGrado = async (req, res) => {
  try {
    const { id_grado } = req.params;
    const { nombre_grado } = req.body;
    const grado = await Grado.findByPk(id_grado);
    if (!grado) {
      return res.status(404).json({ msg: "No se encontro el grado" });
    }
    grado.nombre_grado = nombre_grado;
    grado.save();
    res.status(200).json(grado);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actualizar el grado" });
  }
};

//CONTROLADOR PARA ELIMINAR ROLES
export const deleteRoles = async (req, res) => {
  try {
    const { id_grado } = req.params;
    const grado = await Grado.destroy({
      where: { id_grado },
    });
    if (!grado) {
      return res.status(404).json({ msg: "No se encontro el grado" });
    }
    res.status(200).json({ msg: "Grado eliminado existosamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el grado" });
  }
};
