import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';

@Processor('orders-queue')
export class JobsProcessor {
    private readonly logger = new Logger(JobsProcessor.name);

    constructor(
        private readonly mailService: MailService,
        private readonly prisma: PrismaService,
    ) { }

    @Process('process-order')
    async handleProcessOrder(job: Job<{ orderId: number }>) {
        const { orderId } = job.data;
        this.logger.log(`[orders-queue] Iniciando processamento do pedido #${orderId}...`);

        try {
            // 1. Busca dados do pedido incluindo o usuário para obter o e-mail
            const order = await (this.prisma as any).order.findUnique({
                where: { id: orderId },
                include: {
                    user: { select: { email: true, name: true } },
                },
            });

            if (!order) {
                this.logger.warn(`Pedido #${orderId} não encontrado na fila. Ignorando.`);
                return;
            }

            // 2. Atualiza o status do pedido para PROCESSING
            await (this.prisma as any).order.update({
                where: { id: orderId },
                data: { status: 'PROCESSING' },
            });
            this.logger.log(`Pedido #${orderId} atualizado para PROCESSING.`);

            // 3. Dispara o e-mail de confirmação para o cliente
            await this.mailService.sendOrderConfirmation(
                order.user.email,
                orderId,
                Number(order.total),
            );

            this.logger.log(`✅ Pedido #${orderId} processado com sucesso!`);
        } catch (error) {
            this.logger.error(`❌ Erro ao processar pedido #${orderId}: ${error.message}`);
            // BullMQ vai retentar automaticamente conforme a política de retries da fila
            throw error;
        }
    }
}
