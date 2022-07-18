export abstract class MailerService {
    public abstract sendMail(to: string, subject: string, text: string): Promise<any>
}