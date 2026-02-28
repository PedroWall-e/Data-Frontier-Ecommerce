import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    getCart(@CurrentUser() user: { id: number }) {
        return this.cartService.getCart(user.id);
    }

    @Post('items')
    addItem(
        @CurrentUser() user: { id: number },
        @Body('skuId') skuId: number,
        @Body('quantity') quantity: number,
    ) {
        return this.cartService.addItem(user.id, +skuId, +quantity);
    }

    @Put('items/:id')
    updateItem(
        @CurrentUser() user: { id: number },
        @Param('id') itemId: string,
        @Body('quantity') quantity: number,
    ) {
        return this.cartService.updateItem(user.id, +itemId, +quantity);
    }

    @Delete('items/:id')
    removeItem(
        @CurrentUser() user: { id: number },
        @Param('id') itemId: string,
    ) {
        return this.cartService.removeItem(user.id, +itemId);
    }

    @Delete()
    clearCart(@CurrentUser() user: { id: number }) {
        return this.cartService.clearCart(user.id);
    }
}
