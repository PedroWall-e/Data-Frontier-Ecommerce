import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JobsService } from './jobs.service';
import { JobsProcessor } from './jobs.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'orders-queue',
        }),
    ],
    providers: [JobsService, JobsProcessor],
    exports: [JobsService], // Exporta para o PaymentsModule usar
})
export class JobsModule { }
