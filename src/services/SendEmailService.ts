import { createTransport } from 'nodemailer'

// inform your settings
const USER = ''
const PASS = ''
const HOST = ''
const PORT = 587

class SendEmailService {
  async execute(to: string, message: string, subject: string) {
    const transporter = createTransport({
      host: HOST,
      port: PORT,
      secure: false,
      auth: {
        user: USER,
        pass: PASS
      }
    })

    try {
      await transporter.sendMail({
        from: USER,
        to,
        subject,
        html: message
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export { SendEmailService }
