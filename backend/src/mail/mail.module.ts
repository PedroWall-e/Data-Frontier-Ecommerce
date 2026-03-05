import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
    providers: [MailService],
    exports: [MailService], // Exportado para uso no JobsModule e outros módulos
})
export class MailModule { }
