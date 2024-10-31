
export const generarContrasenia = (longitud = 8) => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let contrasenia = '';
    for (let i = 0; i < longitud; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      contrasenia += caracteres[randomIndex];
    }
    return contrasenia;
  };