import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';

@Processor('orders-queue')
export class JobsProcessor {
    @Process('process-order')
    async handleProcessOrder(job: Job<{ orderId: number }>) {
        const { orderId } = job.data;
        console.log(`[orders-queue] Processando pedido em background... ID: ${orderId}`);
        // Aqui virão: envio de e-mail, emissão de NFe, atualização de estoque, etc.
    }
}
