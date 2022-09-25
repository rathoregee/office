import nodemailer, { Transporter } from 'nodemailer';

export const transporter: Transporter = nodemailer.createTransport({
    host: 'email-smtp.eu-west-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
        user: '',
        pass: '',
    },
});
