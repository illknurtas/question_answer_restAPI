const nodemailer = require('nodemailer');

const sendEmail = async(mailOptions) =>{
    let transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    let info = await transporter.sendEmail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);
};

module.exports = sendEmail;