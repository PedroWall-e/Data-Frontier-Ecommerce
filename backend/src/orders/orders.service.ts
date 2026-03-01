import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { ShippingService } from '../shipping/shipping.service';

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService,
        private cartService: CartService,
        private productsService: ProductsService,
        private shippingService: ShippingService,
    ) { }

    async createOrderFromCart(userId: number, addressId: number, options?: { couponCode?: string, notes?: string }) {
        const cart = await this.cartService.getCart(userId);
        if (!cart.items.length) {
            throw new BadRequestException('O carrinho está vazio.');
        }

        const { items } = cart;
        let subtotal = 0;

        // Verificar estoque e calcular subtotal baseado em dados reais de DB
        for (const item of items) {
            const sku = await (this.prisma as any).productSku.findUnique({ where: { id: item.skuId } });
            if (!sku || sku.stock < item.quantity) {
                throw new BadRequestException(`Estoque insuficiente para o Produto: ${sku?.sku || 'Desconhecido'}`);
            }
            subtotal += Number(sku.price) * item.quantity;
        }

        // Calcula Desconto e Frete Baseado no Endereço
        const address = await (this.prisma as any).address.findUnique({ where: { id: addressId } });
        if (!address) throw new NotFoundException('Endereço não encontrado');

        const shippingData = await this.shippingService.calculateShipping(address.zipCode);
        let shippingCost = shippingData.price;
        let discount = 0;

        if (options?.couponCode) {
            const coupon = await (this.prisma as any).coupon.findUnique({ where: { code: options.couponCode } });
            if (coupon && coupon.isActive && (!coupon.expiresAt || coupon.expiresAt > new Date())) {
                if (!coupon.minOrderValue || subtotal >= Number(coupon.minOrderValue)) {
                    if (coupon.type === 'PERCENTAGE') discount = (subtotal * Number(coupon.value)) / 100;
                    if (coupon.type === 'FIXED_AMOUNT') discount = Number(coupon.value);
                    if (coupon.type === 'FREE_SHIPPING') shippingCost = 0;
                }
            }
        }

        const total = subtotal + shippingCost - discount;

        // Transaction no banco de dados
        const order = await (this.prisma as any).$transaction(async (tx: any) => {
            // Cria Ordem
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    addressId,
                    status: 'PENDING',
                    paymentStatus: 'PENDING',
                    subtotal,
                    shippingCost,
                    discount,
                    total,
                    notes: options?.notes,
                    couponCode: options?.couponCode,
                },
            });

            // Move Items do Cart para OrderItem e reserva estoque
            for (const item of items) {
                const sku = await tx.productSku.findUnique({ where: { id: item.skuId } });
                await tx.orderItem.create({
                    data: {
                        orderId: newOrder.id,
                        skuId: item.skuId,
                        quantity: item.quantity,
                        unitPrice: sku.price,
                        totalPrice: Number(sku.price) * item.quantity,
                    },
                });

                // Deduz estoque disponível e adiciona ao estoque reservado
                await tx.productSku.update({
                    where: { id: item.skuId },
                    data: {
                        stock: { decrement: item.quantity },
                        reservedStock: { increment: item.quantity },
                    },
                });
            }

            // Limpa carrinho
            await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

            return newOrder;
        });

        return order;
    }

    async getMyOrders(userId: number) {
        return (this.prisma as any).order.findMany({
            where: { userId },
            include: {
                items: { include: { sku: { include: { product: { select: { name: true } } } } } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getOrderById(id: number, userId?: number) {
        const order = await (this.prisma as any).order.findUnique({
            where: { id },
            include: {
                items: { include: { sku: { include: { product: { select: { name: true } } } } } },
                address: true,
            },
        });

        if (!order) throw new NotFoundException('Pedido não encontrado');
        if (userId && order.userId !== userId) throw new NotFoundException('Pedido não encontrado');

        return order;
    }

    async getAllOrders() {
        return (this.prisma as any).order.findMany({
            include: { user: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }

    async generateShippingLabel(orderId: number) {
        const order = await (this.prisma as any).order.findUnique({ where: { id: orderId } });
        if (!order) throw new NotFoundException('Pedido não encontrado');

        if (order.status === 'SHIPPED') {
            throw new BadRequestException('Pedido já despachado com a etiqueta: ' + order.trackingCode);
        }

        const trackingCode = 'DF-' + Math.random().toString(36).substring(2, 9).toUpperCase() + 'BR';

        return (this.prisma as any).order.update({
            where: { id: orderId },
            data: {
                status: 'SHIPPED',
                trackingCode: trackingCode
            }
        });
    }
}
