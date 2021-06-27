const nodemailer = require('nodemailer')


class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASS,
            }
        })
    }


    async sendActicationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to,
            subject: 'Активация аккаунта Fox',
            text: '',
            html:
            `
                <div>
                    <h1>Для активации перейдете по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}


module.exports = new MailService() 