import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    async getCart(userId: number) {
        let cart = await (this.prisma as any).cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        sku: {
                            include: { product: { select: { name: true, slug: true } } },
                        },
                    },
                },
            },
        });

        if (!cart) {
            cart = await (this.prisma as any).cart.create({
                data: { userId },
                include: { items: true },
            });
        }

        return cart;
    }

    async addItem(userId: number, skuId: number, quantity: number) {
        if (quantity <= 0) throw new BadRequestException('Quantidade deve ser maior que 0.');

        const cart = await this.getCart(userId);
        const sku = await (this.prisma as any).productSku.findUnique({ where: { id: skuId } });

        if (!sku) throw new NotFoundException('SKU não encontrado.');
        if (sku.stock < quantity) throw new BadRequestException('Estoque insuficiente para este SKU.');

        const existingItem = await (this.prisma as any).cartItem.findFirst({
            where: { cartId: cart.id, skuId },
        });

        if (existingItem) {
            if (sku.stock < existingItem.quantity + quantity) {
                throw new BadRequestException('Estoque insuficiente para adicionar mais dessa quantidade.');
            }
            return (this.prisma as any).cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        }

        return (this.prisma as any).cartItem.create({
            data: {
                cartId: cart.id,
                skuId,
                quantity,
            },
        });
    }

    async updateItem(userId: number, itemId: number, quantity: number) {
        if (quantity <= 0) return this.removeItem(userId, itemId);

        const cart = await this.getCart(userId);
        const item = await (this.prisma as any).cartItem.findFirst({
            where: { id: itemId, cartId: cart.id },
            include: { sku: true },
        });

        if (!item) throw new NotFoundException('Item não encontrado no carrinho.');
        if (item.sku.stock < quantity) throw new BadRequestException('Estoque insuficiente.');

        return (this.prisma as any).cartItem.update({
            where: { id: itemId },
            data: { quantity },
        });
    }

    async removeItem(userId: number, itemId: number) {
        const cart = await this.getCart(userId);
        const item = await (this.prisma as any).cartItem.findFirst({
            where: { id: itemId, cartId: cart.id },
        });

        if (!item) throw new NotFoundException('Item não encontrado no carrinho.');

        return (this.prisma as any).cartItem.delete({
            where: { id: itemId },
        });
    }

    async clearCart(userId: number) {
        const cart = await this.getCart(userId);
        return (this.prisma as any).cartItem.deleteMany({
            where: { cartId: cart.id },
        });
    }
}
