import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { SkusModule } from './skus/skus.module';

@Module({
  imports: [PrismaModule, ProductsModule, CategoriesModule, BrandsModule, SkusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
