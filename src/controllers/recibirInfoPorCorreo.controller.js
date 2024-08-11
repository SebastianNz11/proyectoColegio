import {sendEmail} from '../helpers/recibirInfoPorCorreo.js'

export const postEmail = async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;
    await sendEmail(nombre, email, mensaje);
    res.status(200).send("Correo enviado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al enviar el correo");
  }
};