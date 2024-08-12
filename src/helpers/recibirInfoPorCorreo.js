import nodemailer from "nodemailer";
import "dotenv/config";

export const sendEmail = async (nombre, email, mensaje) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CORREO,
      pass: process.env.CLAVEGOOGLE,
    },
    tls: {
      rejectUnauthorized: false, // Desactiva la verificación del certificado
    },
  });
  console.log(email)
  let info = await transporter.sendMail({
    from: `${nombre} ${email}`,
    replyTo: email,
    to: process.env.CORREO,
    subject: "Datos del formulario",
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};
