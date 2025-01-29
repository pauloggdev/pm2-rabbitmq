const nodemailer = require('nodemailer');

export default class EmailService {
    service: string;
    transporter: any;
    constructor(readonly user: string, readonly pass: string) {
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
    async sendEmail(to: string, subject: string, text: string, html: any = null) {
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