import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrdersService } from '../orders/orders.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
    private stripe: Stripe;

    constructor(
        private prisma: PrismaService,
        private ordersService: OrdersService,
    ) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
            apiVersion: '2026-02-25.clover' as any,
        });
    }

    async createCheckoutSession(userId: number, orderId: number) {
        const order = await this.ordersService.getOrderById(orderId, userId);

        if (order.paymentStatus === 'PAID') {
            throw new BadRequestException('Pedido já está pago.');
        }

        const lineItems = order.items.map(item => ({
            price_data: {
                currency: 'brl',
                product_data: {
                    name: item.sku.product?.name || `Product ID ${item.sku.productId} (${item.sku.sku})`,
                },
                unit_amount: Math.round(Number(item.unitPrice) * 100), // Stripe exige centavos
            },
            quantity: item.quantity,
        }));

        // Se houver frete, adiciona como item de linha
        if (Number(order.shippingCost) > 0) {
            lineItems.push({
                price_data: {
                    currency: 'brl',
                    product_data: { name: 'Frete' },
                    unit_amount: Math.round(Number(order.shippingCost) * 100),
                },
                quantity: 1,
            });
        }

        // Se houver desconto
        const discounts = [];
        if (order.couponCode) {
            // Idealmente teríamos os descontos associados no Stripe
        }

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card', 'boleto'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
            client_reference_id: order.id.toString(),
            customer_email: order.user?.email || undefined,
        });

        return {
            sessionId: session.id,
            url: session.url
        };
    }

    async handleWebhook(signature: string, payload: Buffer) {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        } catch (err: any) {
            throw new BadRequestException(`Webhook Error: ${err.message}`);
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            if (session.client_reference_id) {
                const orderId = parseInt(session.client_reference_id, 10);
                await this.updateOrderPaymentStatus(orderId, 'PAID');
            }
        } else if (event.type === 'payment_intent.payment_failed') {
            // payment failed logic
        }

        return { received: true };
    }

    private async updateOrderPaymentStatus(orderId: number, status: 'PAID' | 'FAILED' | 'PENDING' | 'REFUNDED') {
        return (this.prisma as any).order.update({
            where: { id: orderId },
            data: { paymentStatus: status },
        });
    }
}
