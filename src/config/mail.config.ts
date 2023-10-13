import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";

export const mailerConfigAsync: MailerAsyncOptions = {
    useFactory(...args) {

        let auth = {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }

        if(process.env.MAIL_USER == '' && process.env.MAIL_PASS == '') {
            auth = null;
        }

        return {
            transport: {
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                ignoreTLS: true,
                secure: false,
                auth: auth,
                // auth: {
                //     user: process.env.MAIL_USER,
                //     pass: process.env.MAIL_PASS
                // },
            },
            defaults: {
                from: process.env.MAIL_FROM_DEFAULT,
            },
            template: {
                //src/shared/send-email/templates
                dir: __dirname + '/../shared/send-email/templates',
                adapter: new EjsAdapter(),
                options: {
                    // strict: true, // locals.contextData
                    strict: false, // contextData
                },
            },
            preview: false,
        }
    }
}