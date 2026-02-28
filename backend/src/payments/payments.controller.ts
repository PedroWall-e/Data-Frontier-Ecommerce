import { Controller, Post, Body, Req, Headers, UseGuards, Param, RawBodyRequest } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('checkout-session/:orderId')
    createSession(
        @CurrentUser() user: { id: number },
        @Param('orderId') orderId: string,
    ) {
        return this.paymentsService.createCheckoutSession(user.id, +orderId);
    }

    // Webhooks NÃO USAM JWT porque são chamados pelos servidores da Stripe!
    @Post('webhook')
    async handleStripeWebhook(
        @Headers('stripe-signature') signature: string,
        @Req() req: any, // Raw Request
    ) {
        // Nota: Para capturar RawBodyRequest, o main.ts precisa de `{ rawBody: true }` no NestFactory.
        const raw = req.rawBody;
        return this.paymentsService.handleWebhook(signature, raw);
    }
}
