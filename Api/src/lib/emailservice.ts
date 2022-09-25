import { injectable } from "inversify";
import { Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { IFormData } from "./IFormData";
import { IEmail } from "./IEmail";
import { Attachment } from "nodemailer/lib/mailer";

@injectable()
export class EmailService implements IEmail {
  async send(
    logger: any,
    transporter: Transporter,
    params: IFormData
  ): Promise<boolean> {
    logger.info(`sending email`);

    let info = await transporter.sendMail(this.setupParameters(params));

    if (info == undefined) {
      throw new Error("nodemailer has failed to send email");
    }

    logger.info(JSON.stringify(info));

    logger.info(`sending email completed`);

    return true;
  }

  setupParameters = (params: IFormData): Mail.Options => {
    let mail: Mail.Options = {};
    mail.from = params.from;
    mail.to = params.to;
    if (params.cc.length > 0) {
      mail.cc = params.cc;
    }
    if (params.bcc.length > 0) {
      mail.bcc = params.bcc;
    }
    mail.subject = params.subject;
    if (
      !!params.isHtmlBody &&
      params.isHtmlBody.trim().toLowerCase() === "true"
    ) {
      mail.html = params.body;
    } else {
      mail.text = params.body;
    }

    if (!!params.priority && params.priority.trim().toLowerCase() === "high") {
      mail.priority = "high";
    }
    if (
      !!params.priority &&
      params.priority.trim().toLowerCase() === "normal"
    ) {
      mail.priority = "normal";
    }
    if (!!params.priority && params.priority.trim().toLowerCase() === "low") {
      mail.priority = "low";
    }

    if (params.attachment !== undefined) {
      let list: Attachment[] = [];
      list.push(params.attachment);
      mail.attachments = list;
      
    }
    return mail;
  };
}
