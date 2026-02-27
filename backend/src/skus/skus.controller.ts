import {
    Controller, Get, Post, Body, Param, Put, Delete, Patch
} from '@nestjs/common';
import { SkusService } from './skus.service';

@Controller('skus')
export class SkusController {
    constructor(private readonly skusService: SkusService) { }

    @Get('product/:productId')
    findByProduct(@Param('productId') productId: string) {
        return this.skusService.findByProduct(+productId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.skusService.findOne(+id);
    }

    @Post()
    create(@Body() data: any) {
        return this.skusService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.skusService.update(+id, data);
    }

    @Patch(':id/stock')
    updateStock(@Param('id') id: string, @Body('quantity') quantity: number) {
        return this.skusService.updateStock(+id, quantity);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.skusService.remove(+id);
    }
}
