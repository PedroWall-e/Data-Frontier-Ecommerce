import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return (this.prisma as any).category.findMany({
            where: { isActive: true },
            include: {
                children: {
                    where: { isActive: true },
                    select: { id: true, name: true, slug: true, imageUrl: true },
                },
                _count: { select: { products: true } },
            },
            orderBy: { name: 'asc' },
        });
    }

    findOne(slug: string) {
        return (this.prisma as any).category.findUnique({
            where: { slug },
            include: {
                parent: { select: { id: true, name: true, slug: true } },
                children: { where: { isActive: true } },
                _count: { select: { products: true } },
            },
        });
    }

    create(data: any) {
        return (this.prisma as any).category.create({ data });
    }

    update(id: number, data: any) {
        return (this.prisma as any).category.update({ where: { id }, data });
    }

    remove(id: number) {
        return (this.prisma as any).category.update({
            where: { id },
            data: { isActive: false },
        });
    }
}
