import nodemailer from 'nodemailer';
export const sendEmail = async (nombre, email, contrasenia) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.CORREO,  
        pass: process.env.CLAVEGOOGLE,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    let info = await transporter.sendMail({
      from: `Soporte <${process.env.CORREO}>`,
      to: email,  // Enviar al correo del estudiante
      subject: "Registro Exitoso - Contraseña",
      text: `Hola ${nombre},\n\nTu registro fue exitoso. Aquí tienes tu contraseña:\n\n${contrasenia}\n\nPor favor, cámbiala después de iniciar sesión.`,
    });
  
    console.log("Mensaje enviado: %s", info.messageId);
  };