import nodemailer from "nodemailer";
import { mailConfig } from "../config/mailConfig";
class MailService {
  private _transport;
  constructor() {
    this._transport = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: false,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass,
      },
    });
  }

  async sendMail(options: any) {
    this._transport.sendMail(options, (err, info) => {
      if (err) {
        throw {
          code: 422,
          message: "Not Able to send mail",
        };
      }
      console.log(`send email ${info.response}`);
    });
  }
}
export default MailService;
