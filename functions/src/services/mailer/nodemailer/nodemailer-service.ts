import { envs } from "../../../config";
import { MailerService } from "../mailer-service";

import * as nodemailer from 'nodemailer';

export class NodemailerService implements MailerService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: envs.mailer_login,
      pass: envs.mailer_password
    },
    tls: { rejectUnauthorized: false }
  });

  private static instance: NodemailerService;

  public static getInstance(): NodemailerService {
    if (!NodemailerService.instance) {
      NodemailerService.instance = new NodemailerService();
    }
    
    return NodemailerService.instance;
  }
  
  public async sendMail(to: string, subject: string, text: string): Promise<void> {
    return this.transport.sendMail({
      from: `Compartilha UFSC <${envs.mailer_login}>`,
      to,
      subject,
      text
    })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((response) => console.log('Send email succeded!'))
      .catch((err) => console.log("Error in send mail: ", err))
    ;
  }
}


