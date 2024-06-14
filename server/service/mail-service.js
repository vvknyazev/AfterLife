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
        const logoUrl = `${process.env.API_URL}/media/afterlife-black.svg`;

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Активация Afterlife",
            text: '',
            html:
                `
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                        <div style="text-align: center; margin-bottom: 20px;">
                        <img src="${logoUrl}" alt="Afterlife Logo" style="max-width: 150px;">
                        </div>
                        <h1 style="color: #444; text-align: center;">Добро пожаловать в Afterlife</h1>
                        <p style="font-size: 16px; text-align: center;">Для активации вашего аккаунта введите код ниже:</p>
                        <div style="text-align: center; margin: 20px 0;">
                            <span style="font-size: 24px; font-weight: bold; color: #000; padding: 10px 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #fff;">${activationCode}</span>
                        </div>
                        <p style="font-size: 14px; text-align: center; color: #555;">Код будет действовать в течение 15 минут. Не сообщайте его никому.</p>
                        <br>
                        <p style="font-size: 14px;">С уважением,</p>
                        <p style="font-size: 14px; font-weight: bold;">Команда Afterlife</p>
                    </div>
                </div>
            `
        })
    }
}
module.exports = new MailService();
