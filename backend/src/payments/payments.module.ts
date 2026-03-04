import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { OrdersModule } from '../orders/orders.module';
import { JobsModule } from '../jobs/jobs.module';

@Module({
    imports: [OrdersModule, JobsModule],
    providers: [PaymentsService],
    controllers: [PaymentsController],
    exports: [PaymentsService],
})
export class PaymentsModule { }
