import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { OrdersService } from '../orders/orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin')
export class AdminController {
    constructor(
        private adminService: AdminService,
        private ordersService: OrdersService
    ) { }

    @Get('dashboard')
    getDashboardMetrics() {
        return this.adminService.getDashboardMetrics();
    }

    @Get('orders')
    getAllOrders() {
        return this.ordersService.getAllOrders();
    }

    @Post('orders/:id/dispatch')
    dispatchOrder(@Param('id') id: string) {
        return this.ordersService.generateShippingLabel(+id);
    }
}
