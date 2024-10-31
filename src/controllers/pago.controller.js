import Stripe from "stripe";
import { Padre } from '../models/padre.model.js';
import {Estudiante} from '../models/estudiante.model.js'
import { Pago } from "../models/pago.model.js";
import { Mora } from "../models/mora.model.js";
import { Op, fn, col } from "sequelize";
import {Sequelize} from 'sequelize'
import moment from 'moment';
import { PassThrough } from 'stream';
import PDFDocument from "pdfkit";



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
    res.status(500).json({ msg: "No se pudo obtener la informacion del pago" });
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
      estado,
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








const stripe = new Stripe(
  "sk_test_51Pi7zEHLX4cxCWgz6PugdVFd5P34a4GYI3HDdExbT4kdPJPPwxfjuH5UeBuq9LzqvqFMIVXsDF2yPugwZgt0ox6R00mrLP1lnI"
);

export const hacerPago = async (req, res) => {
  try {
    const { id_padre, monto } = req.body;

    // Verificar si ya hay un pago realizado en el mes
    const pagosExistentes = await Pago.findAll({
      where: {
        id_padre,
        fecha_pago: {
          [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Desde el primer día del mes
        },
      },
    });

    if (pagosExistentes.length > 0) {
      return res.status(400).json({ 
        message: "Ya has realizado un pago este mes." 
      });
    }

    const fechaActual = new Date();
    const esMora = fechaActual.getDate() > 10;

    // Crear una sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: { name: "colegiatura", description: "Cobro mensual" },
            currency: "usd",
            unit_amount: monto * 100, // Convertir a centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/pago-exitoso",
      cancel_url: "http://localhost:5173/dashboard",
    });

    // Registrar el pago en la base de datos
    const pago = await Pago.create({
      id_padre,
      fecha_pago: fechaActual,
      monto: esMora ? monto + 20 : monto,
      estado: "pagado",
    });

    // Registrar mora si aplica
    if (esMora) {
      await Mora.create({
        id_pago: pago.id_pago,
        fecha_mora: fechaActual,
        monto_mora: 20,
      });
    }

    return res.json({ url: session.url });
  } catch (error) {
    res.status(500).send(error.message);
  }
};









export const verificarMora = async (req, res) => {
  const { id_padre } = req.params;

  try {
    const padre = await Padre.findOne({
      where: { id_padre },
      include: [
        {
          model: Pago,
          as: 'pagos',
          include: {
            model: Mora,
            as: 'moras',
          },
        },
      ],
    });

    if (!padre) {
      return res.status(404).json({ message: 'Padre no encontrado' });
    }

    // Verificar si el padre tiene algún pago registrado
    if (padre.pagos.length === 0) {
      // Si no tiene pagos, se asume que tiene mora
      return res.json({ tieneMora: true });
    }

    // Verificar si algún pago tiene moras asociadas
    const tieneMora = padre.pagos.some(pago => pago.moras.length > 0);

    return res.json({ tieneMora });
  } catch (error) {
    console.error("Error al verificar mora:", error.message);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};













export const generarReportePagosPDF = async (req, res) => {
  try {
    // Obtener todos los pagos ordenados por fecha
    const pagos = await Pago.findAll({
      order: [['fecha_pago', 'ASC']],
    });

    // Verificar si se encontraron datos para los pagos
    if (pagos.length === 0) {
      return res.status(404).json({
        message: "No se encontraron pagos",
      });
    }

    // Crear un nuevo documento PDF en memoria
    const doc = new PDFDocument();
    const stream = res.write();

    // Configurar encabezados para la respuesta
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="reporte_pagos.pdf"`,
    });

    // Pipe the PDF document to the response
    doc.pipe(stream);

    // Establecer el encabezado
    doc.fontSize(16).text("Reporte de Pagos", { align: "center" }).moveDown();

    // Iterar sobre los pagos y agregar información al PDF
    pagos.forEach(pago => {
      const fechaFormateada = moment(pago.fecha_pago).format("MMM Do YYYY");
      doc.fontSize(12).text(`ID de Pago: ${pago.id_pago}`).moveDown();
      doc.text(`Fecha de Pago: ${fechaFormateada}`).moveDown();
      doc.text(`Monto: ${pago.monto}`).moveDown();
      doc.text(`Estado: ${pago.estado}`).moveDown();
      doc.moveDown(); // Espacio adicional entre pagos
    });

    // Finalizar el PDF
    doc.end();

    // Enviar el PDF como respuesta
    stream.on('finish', () => {
      res.send(); // Enviar el PDF como respuesta
    });

  } catch (error) {
    console.error("Error al generar el PDF de pagos:", error);
    res.status(500).json({
      message: "Error al generar el PDF de pagos",
      error: error.message,
    });
  }
};






export const obtenerPagos = async (req, res) => {
  try {
      const pagos = await Pago.findAll({
          attributes: ['fecha_pago', 'monto', 'estado'], // Campos que quieres obtener
      });
      res.json(pagos);
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener los pagos', error });
  }
};