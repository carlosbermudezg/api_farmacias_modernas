const nodemailer = require('nodemailer')

const sendMail = ()=>{
    // Configura el transporte de nodemailer
    const transporter = nodemailer.createTransport({
        host: 'mail.esys-ec.misitio.xyz', // tu servidor SMTP
        port: 465, // puerto SMTP, usualmente 587 o 465
        secure: true, // true para el puerto 465, false para otros puertos
        auth: {
        user: 'prueba@esys-ec.misitio.xyz', // tu correo de Gmail
        pass: '.enlasnubes777' // tu contraseña de Gmail o App Password
        },
        tls: {
          // Si tu servidor tiene un certificado auto-firmado, puede que necesites añadir esta opción
          rejectUnauthorized: false
        }
    })
    
    // Define las opciones del correo
    const mailOptions = {
    from: 'apisystem@farmaciaslopez.com', // remitente
    to: 'prueba@esys-ec.misitio.xyz', // destinatario
    subject: 'Api System: Nuevo Usuario registrado',
    html: '<p>Un nuevo usuario se ha registrado en la plataforma</p>'
    }
    
    // Envía el correo
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error al enviar el correo: ', error);
    }
    console.log('Correo enviado: ' + info.response);
    })
}

module.exports = { sendMail };
