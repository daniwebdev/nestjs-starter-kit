import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendEmailService<T> {
    constructor(
        private readonly mailerService: MailerService
    ) {}

    async welcomeRegisterEmail(email: string, userData?: T): Promise<void> {
        this.mailerService.sendMail({
            to: email, // list of receivers
            subject: 'Welcome to trader community', // Subject line
            template: 'welcome-register',
            context: {
                user: userData
            }
        }).then(success => {
            // console.log(success);
        }).catch(error => {
            console.log(error)
        }) 
    }

    async sendEmailVerificationCode(email: string, code: string, name: string): Promise<void> {

        this.mailerService.sendMail({
            to: email,
            // from: 'noreply@maxrich.us',
            subject: 'Email Verification - '+code,
            template: 'email-verification-code',
            context: {
                code,
                email,
                name
            }
        }).then(success => {
            // console.log(success);
        }).catch(error => {
            console.log(error)
        }) 
    }

    async marginCallNotice(email:string, name:string): Promise<void> {

        this.mailerService.sendMail({
            to: email,
            subject: "Margin Call Notice..!",
            template: 'margin-call-notice',
            context: {
                user: {
                    email,
                    name
                }
            }
        }).then(success => {
            // console.log(success);
        }).catch(error => {
            console.log(error)
        }) 
    }

    // do more service to send emails
}
