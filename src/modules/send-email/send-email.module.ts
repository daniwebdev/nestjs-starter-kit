import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { mailerConfigAsync } from 'src/config/mail.config';

@Module({
  imports: [
    MailerModule.forRootAsync(mailerConfigAsync),
  ],
  providers: [SendEmailService],
  exports: [SendEmailService]
})
export class SendEmailModule {}
