import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getDashboardMetrics() {
        const totalUsers = await (this.prisma as any).user.count({ where: { role: 'CUSTOMER' } });

        const totalOrders = await (this.prisma as any).order.count();
        const pendingOrders = await (this.prisma as any).order.count({ where: { status: 'PENDING' } });

        // Sum total revenue
        const result = await (this.prisma as any).order.aggregate({
            _sum: {
                total: true
            },
            where: {
                paymentStatus: 'PAID'
            }
        });

        const totalRevenue = result._sum.total || 0;

        // Ultimos 5 tickets/pedidos
        const recentOrders = await (this.prisma as any).order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true, email: true } } }
        });

        return {
            totalUsers,
            totalOrders,
            pendingOrders,
            totalRevenue,
            recentOrders
        };
    }
}
