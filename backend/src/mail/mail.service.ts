import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private transporter: nodemailer.Transporter;

    constructor() {
        // Para ambiente local/dev: usa Ethereal (inbox de teste gratuito)
        // Em produção: substitua por SendGrid, SES ou SMTP real via variáveis de ambiente
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || 'smtp.ethereal.email',
            port: parseInt(process.env.MAIL_PORT || '587'),
            auth: {
                user: process.env.MAIL_USER || 'ethereal_user@ethereal.email',
                pass: process.env.MAIL_PASS || 'ethereal_password',
            },
        });
    }

    async sendOrderConfirmation(
        userEmail: string,
        orderId: number,
        total: number,
    ): Promise<void> {
        const subject = `✅ Pedido #${orderId} Confirmado - Data Frontier Store`;

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 12px;">
                <div style="background: #3347FF; padding: 24px; border-radius: 8px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">data<span style="color: #FFE3D6">frontier</span>.store</h1>
                </div>
                <div style="background: white; padding: 32px; border-radius: 8px; margin-top: 16px;">
                    <h2 style="color: #2B2B2B;">🎉 Pedido Confirmado!</h2>
                    <p style="color: #666; font-size: 16px;">
                        Seu pedido foi recebido e o pagamento foi aprovado com sucesso.
                    </p>
                    <div style="background: #F0F3FF; padding: 20px; border-radius: 8px; margin: 24px 0;">
                        <p style="margin: 0; font-size: 14px; color: #666;">Número do Pedido</p>
                        <p style="margin: 4px 0 0; font-size: 22px; font-weight: bold; color: #3347FF;">#${orderId}</p>
                    </div>
                    <div style="border-top: 1px solid #eee; padding-top: 16px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #666;">Total Pago:</span>
                            <span style="font-weight: bold; color: #2B2B2B;">R$ ${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <p style="color: #666; margin-top: 24px; font-size: 14px;">
                        Você receberá atualizações sobre a entrega por e-mail. Acompanhe seu pedido no painel da loja.
                    </p>
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin" 
                       style="display: inline-block; background: #3347FF; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 8px;">
                        Acompanhar Pedido
                    </a>
                </div>
                <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 16px;">
                    © ${new Date().getFullYear()} Data Frontier Store. Todos os direitos reservados.
                </p>
            </div>
        `;

        try {
            const info = await this.transporter.sendMail({
                from: `"Data Frontier Store" <${process.env.MAIL_FROM || 'noreply@datafrontier.store'}>`,
                to: userEmail,
                subject,
                html,
            });

            this.logger.log(`📧 E-mail de confirmação enviado para ${userEmail} | ID: ${info.messageId}`);

            // Em ambiente Ethereal, loga a URL de preview para visualizar o e-mail
            if (process.env.NODE_ENV !== 'production') {
                const previewUrl = nodemailer.getTestMessageUrl(info);
                if (previewUrl) {
                    this.logger.log(`🔗 Preview do e-mail (Ethereal): ${previewUrl}`);
                }
            }
        } catch (error) {
            // Não lança exceção — falha de e-mail não deve bloquear o pedido
            this.logger.error(`❌ Falha ao enviar e-mail para ${userEmail}: ${error.message}`);
        }
    }
}
