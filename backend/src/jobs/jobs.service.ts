import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class JobsService {
    constructor(
        @InjectQueue('orders-queue') private ordersQueue: Queue,
    ) { }

    async addOrderJob(orderId: number) {
        await this.ordersQueue.add('process-order', { orderId });
        console.log(`[JobsService] Job adicionado à orders-queue para orderId: ${orderId}`);
    }
}
