import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JobsService } from './jobs.service';
import { JobsProcessor } from './jobs.processor';
import { MailModule } from '../mail/mail.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'orders-queue',
        }),
        MailModule,
        PrismaModule,
    ],
    providers: [JobsService, JobsProcessor],
    exports: [JobsService],
})
export class JobsModule { }
