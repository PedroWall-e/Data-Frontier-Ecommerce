import {
    Controller, Get, Post, Body, Param, Put, Delete, Query
} from '@nestjs/common';
import { ProductsService, ProductsFilter } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    findAll(
        @Query('categoryId') categoryId?: string,
        @Query('brandId') brandId?: string,
        @Query('search') search?: string,
        @Query('isFeatured') isFeatured?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('orderBy') orderBy?: ProductsFilter['orderBy'],
    ) {
        return this.productsService.findAll({
            ...(categoryId && { categoryId: +categoryId }),
            ...(brandId && { brandId: +brandId }),
            ...(search && { search }),
            ...(isFeatured !== undefined && { isFeatured: isFeatured === 'true' }),
            ...(page && { page: +page }),
            ...(limit && { limit: +limit }),
            ...(orderBy && { orderBy }),
        });
    }

    @Get(':idOrSlug')
    findOne(@Param('idOrSlug') idOrSlug: string) {
        const id = parseInt(idOrSlug);
        return this.productsService.findOne(isNaN(id) ? idOrSlug : id);
    }

    @Post()
    create(@Body() data: any) {
        return this.productsService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.productsService.update(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }
}
