import Handlebars from 'handlebars';
import { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ServerConfig } from '../config';
export declare class ServerMailer {
    private config;
    transporter: Transporter<SMTPTransport.SentMessageInfo>;
    handlebars: typeof Handlebars;
    private templates;
    constructor(transporter: Transporter<SMTPTransport.SentMessageInfo>, config: ServerConfig);
    static getEmailConfig(config: ServerConfig): {
        appUrlPasswordReset: string;
    };
    sendResetPassword(params: {
        token: string;
    }, mailOpts: Mail.Options): Promise<SMTPTransport.SentMessageInfo>;
    private sendTemplate;
    private compile;
}
