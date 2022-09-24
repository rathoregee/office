import { Transporter } from "nodemailer";
import { IFormData } from "./IFormData";

export interface IEmail {
  send: (
    logger: any,
    transporter: Transporter,
    params: IFormData
  ) => Promise<boolean>;
}
