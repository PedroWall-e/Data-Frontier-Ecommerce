import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface ProductsFilter {
    categoryId?: number;
    brandId?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    isFeatured?: boolean;
    page?: number;
    limit?: number;
    orderBy?: 'price_asc' | 'price_desc' | 'newest' | 'name';
}

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll(filter: ProductsFilter = {}) {
        const {
            categoryId,
            brandId,
            search,
            isFeatured,
            page = 1,
            limit = 20,
            orderBy = 'newest',
        } = filter;

        const skip = (page - 1) * limit;

        const where: any = {
            isActive: true,
            ...(categoryId && { categoryId }),
            ...(brandId && { brandId }),
            ...(isFeatured !== undefined && { isFeatured }),
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { tags: { has: search } },
                ],
            }),
        };

        const orderByMap: Record<string, any> = {
            newest: { createdAt: 'desc' },
            name: { name: 'asc' },
        };

        const [data, total] = await Promise.all([
            (this.prisma as any).product.findMany({
                where,
                skip,
                take: limit,
                orderBy: orderByMap[orderBy] ?? { createdAt: 'desc' },
                include: {
                    category: { select: { id: true, name: true, slug: true } },
                    brand: { select: { id: true, name: true, slug: true } },
                    images: { where: { isPrimary: true }, take: 1 },
                    skus: {
                        where: { isActive: true },
                        select: { id: true, sku: true, price: true, stock: true, comparePrice: true },
                        orderBy: { price: 'asc' },
                        take: 1,
                    },
                    reviews: { select: { rating: true } },
                },
            }),
            (this.prisma as any).product.count({ where }),
        ]);

        return {
            data: data.map((p: any) => ({
                ...p,
                avgRating: p.reviews.length
                    ? p.reviews.reduce((s: number, r: any) => s + r.rating, 0) / p.reviews.length
                    : null,
                reviewCount: p.reviews.length,
            })),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(idOrSlug: string | number) {
        const where: any =
            typeof idOrSlug === 'number'
                ? { id: idOrSlug }
                : { slug: idOrSlug };

        return (this.prisma as any).product.findUnique({
            where,
            include: {
                category: true,
                brand: true,
                images: { orderBy: { sortOrder: 'asc' } },
                skus: { where: { isActive: true }, orderBy: { price: 'asc' } },
                attributes: true,
                reviews: {
                    include: { user: { select: { id: true, name: true } } },
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });
    }

    async create(data: any) {
        return (this.prisma as any).product.create({ data });
    }

    async update(id: number, data: any) {
        return (this.prisma as any).product.update({ where: { id }, data });
    }

    async remove(id: number) {
        return (this.prisma as any).product.update({
            where: { id },
            data: { isActive: false },
        });
    }

    async reserveStock(skuId: number, quantity: number) {
        return (this.prisma as any).productSku.updateMany({
            where: {
                id: skuId,
                stock: { gte: quantity },
            },
            data: {
                stock: { decrement: quantity },
                reservedStock: { increment: quantity },
            },
        });
    }

    async releaseReservedStock(skuId: number, quantity: number) {
        return (this.prisma as any).productSku.update({
            where: { id: skuId },
            data: {
                stock: { increment: quantity },
                reservedStock: { decrement: quantity },
            },
        });
    }
}
