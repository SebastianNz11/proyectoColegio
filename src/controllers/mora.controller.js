import { Mora } from "../models/mora.model.js";

//CONTROLADOR PARA TRAER INFORMACION DE MORAS
export const getMora = async (req, res) => {
  try {
    const mora = await Mora.findAll();
    res.status(200).json(mora);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la informacion de las moras" });
  }
};

//CONTROLADOR PARA TRAER INFORMACION DE UNA MORA
export const getMoraById = async (req, res) => {
  try {
    const { id_mora } = req.params;
    const mora = await Mora.findOne({
      where: { id_mora },
    });
    if (!mora) {
      return res.status(400).json({ msg: "No existe la mora" });
    }
    res.status(200).json(mora);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la informacion de la mora" });
  }
};

//CONTROLADOR PARA INSERTAR UNA MORA
export const insertMora = async (req, res) => {
  try {
    const { id_pago, fecha_mora, monto_mora } = req.body;
    const mora = await Mora.create({
      id_pago,
      fecha_mora,
      monto_mora,
    });
    res.status(200).json(mora);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo insertar la mora" });
  }
};

//CONTROLADOR PARA ACTUALIZAR INFORMACION DE UNA MORA
export const updateMora = async (req, res) => {
  try {
    const { id_mora } = req.params;
    const { id_pago, fecha_mora, monto_mora } = req.body;
    const mora = await Mora.findByPk(id_mora);
    if (!mora) {
      res.status(404).json({ msg: "No existe la mora" });
    }
    mora.id_pago = id_pago;
    mora.fecha_mora = fecha_mora;
    mora.monto_mora = monto_mora;
    mora.save();
    res.status(200).json(mora);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actaulizar la mora" });
  }
};

//CONTROLADOR PARA ELIMINAR UN CURSO
export const deleteMora = async (req, res) => {
  try {
    const { id_mora } = req.params;
    const mora = await Mora.destroy({
      where: { id_mora },
    });
    if (!mora) {
      return res.status(404).json({ msg: "No existe la mora" });
    }
    res.status(200).json({ msg: "Mora eliminada con exito" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar la mora" });
  }
};
