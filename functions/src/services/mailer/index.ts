import { NodemailerService } from "./nodemailer/nodemailer-service";

const mailerServiceInstance = NodemailerService.getInstance();

export { mailerServiceInstance };