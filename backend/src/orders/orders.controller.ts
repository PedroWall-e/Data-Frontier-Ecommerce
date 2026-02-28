import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post('checkout')
    createOrder(
        @CurrentUser() user: { id: number },
        @Body('addressId') addressId: number,
        @Body() options?: { couponCode?: string, notes?: string },
    ) {
        return this.ordersService.createOrderFromCart(user.id, +addressId, options);
    }

    @Get()
    getMyOrders(@CurrentUser() user: { id: number }) {
        return this.ordersService.getMyOrders(user.id);
    }

    @Get(':id')
    getOrderById(@CurrentUser() user: { id: number }, @Param('id') id: string) {
        return this.ordersService.getOrderById(+id, user.id);
    }
}
