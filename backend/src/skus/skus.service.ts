import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkusService {
    constructor(private prisma: PrismaService) { }

    findByProduct(productId: number) {
        return (this.prisma as any).productSku.findMany({
            where: { productId, isActive: true },
            orderBy: { price: 'asc' },
        });
    }

    findOne(id: number) {
        return (this.prisma as any).productSku.findUnique({ where: { id } });
    }

    create(data: any) {
        return (this.prisma as any).productSku.create({ data });
    }

    update(id: number, data: any) {
        return (this.prisma as any).productSku.update({ where: { id }, data });
    }

    updateStock(id: number, quantity: number) {
        return (this.prisma as any).productSku.update({
            where: { id },
            data: { stock: { increment: quantity } },
        });
    }

    remove(id: number) {
        return (this.prisma as any).productSku.update({
            where: { id },
            data: { isActive: false },
        });
    }
}
