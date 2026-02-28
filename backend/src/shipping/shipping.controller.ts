import { Body, Controller, Post } from '@nestjs/common';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
    constructor(private readonly shippingService: ShippingService) { }

    @Post('calculate')
    async calculate(@Body() body: { zipCode: string, weightKg?: number }) {
        return this.shippingService.calculateShipping(body.zipCode, body.weightKg);
    }
}
