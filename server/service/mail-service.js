const nodemailer = require('nodemailer');
require('dotenv').config()
class MailService{
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    async sendActivationToMail(to, activationCode){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Активация аккаунта на Afterlife",
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации введите код</h1>
                        <h3>${activationCode}</h3>
                    </div>
                `
        })
    }
}
module.exports = new MailService();