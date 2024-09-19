const nodemailer = require('nodemailer');

// Classe para gerenciar o envio de e-mails
class EmailService {
    constructor(user, pass) {
        this.service = 'gmail';
        this.user = user;
        this.pass = pass;

        // Cria o transporte com as credenciais e host do serviço de e-mail
        this.transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 587,               // Porta para TLS
            secure: false,           // true para 465, false para outras portas
            auth: {
                user: this.user,
                pass: this.pass
            }
        });
    }
    async sendEmail(to, subject, text, html = null) {
        const mailOptions = {
            from: this.user,
            to: to,
            subject: subject,
            text: text,
            html: html || text  // Se o HTML não for fornecido, usa o texto como fallback
        };
       return await this.transporter.sendMail(mailOptions);
    }
}
module.exports = EmailService;