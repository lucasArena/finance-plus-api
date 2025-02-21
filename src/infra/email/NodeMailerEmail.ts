import nodeMailer from 'nodemailer'

import { IEmail, IEmailSendProps } from '@/domain/application/Email.types'
import { resolve } from 'path'
import { promises as fs } from 'fs'
import handlebars from 'handlebars'
import { ENV } from '@/shared/utilities/EnvUtil'

export class NodeMailerEmail implements IEmail {
  private transporter

  constructor() {
    this.transporter = nodeMailer.createTransport({
      service: 'Gmail',
      host: ENV.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASSWORD,
      },
    })
  }

  async send(data: IEmailSendProps) {
    const filePath = resolve('src/domain/templates', `${data.template}.html`)
    const fileContent = await fs.readFile(filePath, 'utf-8')

    const template = handlebars.compile(fileContent)

    await this.transporter.sendMail({
      subject: data.subject,
      to: data.to,
      html: template(data.variables),
    })
  }
}
