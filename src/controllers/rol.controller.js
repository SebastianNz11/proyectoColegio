import { Rol } from "../models/rol.model.js";

//CONTROLADOR PARA TRAER INFORMACION DE ROLES
export const getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener los roles" });
  }
};

//CONTROLADOR PARA TRAER INFORMACION DE UN EMPLEADO
export const getRolesById = async (req, res) => {
  try {
    const { id_rol } = req.params;
    const roles = await Rol.findOne({
      where: { id_rol },
    });
    if (!roles) {
      return res.status(404).json({ msg: "No se encontró el rol" });
    }
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener el rol" });
  }
};

//CONTROLADOR PARA INSERTAR UN ROL
export const insertRoles = async (req, res) => {
  try {
    const { nombre_rol } = req.body;
    const roles = await Rol.create({
      nombre_rol,
    });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo insertar el rol", error });
  }
};

//CONTROLADOR PARA ACTUALIZAR DATOS DE ROL
export const updateRoles = async (req, res) => {
  try {
    const { id_rol } = req.params;
    const { nombre_rol } = req.body;
    const roles = await Rol.findByPk(id_rol);
    if (!roles) {
      return res.status(404).json({ msg: "No se encontró el rol" });
    }
    roles.nombre_rol = nombre_rol;
    roles.save();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actaulizar el rol" });
  }
};

//CONTROLADOR PARA ELIMINAR UN ROL
export const deleteRoles = async (req, res) => {
  try {
    const { id_rol } = req.params;
    const roles = await Rol.destroy({
      where: { id_rol },
    });
    if (!roles) {
      return res.status(404).json({ msg: "No se encontró el rol" });
    }
    res.status(200).json({ msg: "Rol eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el rol" });
  }
};
