import { Pago } from "../models/pago.model.js";

//CONTROLADOR PARA TRAER INFORMACION DE PAGO
export const getPago = async (req, res) => {
  try {
    const pago = await Pago.findAll();
    res.status(200).json(pago);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la informacion de los pagos" });
  }
};

//CONTROLADOR PARA TRAER INFORMACION DE UN PAGO
export const getPagoById = async (req, res) => {
  try {
    const { id_pago } = req.params;
    const pago = await Pago.findOne({
      where: { id_pago },
    });
    if (!pago) {
      return res.status(400).json({ msg: "No existe el pago" });
    }
    res.status(200).json(pago);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la informacion del pago" });
  }
};

//CONTROLADOR PARA INSERTAR UN PAGO
export const insertPago = async (req, res) => {
  try {
    const { id_padre, fecha_pago, monto, estado } = req.body;
    const pago = await Pago.create({
      id_padre,
      fecha_pago,
      monto,
      estado
    });
    res.status(200).json(pago);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo insertar el pago" });
  }
};

//CONTROLADOR PARA ACTUALIZAR INFORMACION DE UN PAGO
export const updatePago = async (req, res) => {
  try {
    const { id_pago } = req.params;
    const { id_padre, fecha_pago, monto, estado } = req.body;
    const pago = await Pago.findByPk(id_pago);
    if (!pago) {
      res.status(404).json({ msg: "No existe el pago" });
    }
    pago.id_padre = id_padre;
    pago.fecha_pago = fecha_pago;
    pago.monto = monto;
    pago.estado = estado;
    pago.save();
    res.status(200).json(pago);
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actualizar el pago" });
  }
};

//CONTROLADOR PARA ELIMINAR UN PAGO
export const deletePago = async (req, res) => {
  try {
    const { id_pago } = req.params;
    const pago = await Pago.destroy({
      where: { id_pago },
    });
    if (!pago) {
      return res.status(404).json({ msg: "No existe el pago" });
    }
    res.status(200).json({ msg: "Pago eliminado con exito" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el pago" });
  }
};
