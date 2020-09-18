'use strict'
const nodemailer = require('nodemailer');
require('dotenv').config();

const gmailEmail = 'henry.appg7@gmail.com';
const gmailPassword = 'soyhenryg7';

//Link para habilitar credenciales delcorreode GMAIL:
// https://myaccount.google.com/lesssecureapps

this.enviar_mail = (pnombre, pemail) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailEmail,
            pass: gmailPassword
        }
    });
    let mail_options = {
        from: 'Henry-App',
        to: pemail,
        subject: 'Bienvenido a Henry-App',
        html: `
            <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#F2F908" bgcolor="#F2F908">
                <tr height="200px">  
                    <td bgcolor="" width="600px">
                        <h1 style="color: #000; text-align:center">Bienvenidos a HENRRY-APP</h1>
                        <p  style="color: #000; text-align:center">                            
                            Hola!
                            <span style="color: #e84393">${pnombre}</span> 
                        </p>
                    </td>
                </tr>
                <tr bgcolor="#fff">
                    <td style="text-align:center">
                        <p style="color: #000">¡Estamos esperando tu registro!</p>
                        <a href="http://localhost:3000/login"> Ingresá a Henry App </a>
                    </td>
                </tr>
            </table>
        `
    };
    transporter.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo se envío correctamente ' + info.response);
        }
    });
};
module.export = this;