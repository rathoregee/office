import { Transporter } from 'nodemailer';
import { IFormData } from './IFormData';

export interface IEmail {
    /*eslint-disable */
    send: (
        logger: any,
        transporter: Transporter,
        params: IFormData
    ) => Promise<boolean>;
}
