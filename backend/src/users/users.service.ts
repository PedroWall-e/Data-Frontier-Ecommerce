import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findByEmail(email: string) {
        return (this.prisma as any).user.findUnique({ where: { email } });
    }

    async findById(id: number) {
        return (this.prisma as any).user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
                addresses: true,
            },
        });
    }

    async create(dto: CreateUserDto) {
        const passwordHash = await bcrypt.hash(dto.password, 10);
        return (this.prisma as any).user.create({
            data: {
                name: dto.name,
                email: dto.email,
                passwordHash,
                phone: dto.phone,
                role: 'CUSTOMER',
                isActive: true,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    }

    async updateProfile(id: number, data: { name?: string; phone?: string }) {
        return (this.prisma as any).user.update({
            where: { id },
            data,
            select: { id: true, name: true, email: true, phone: true, role: true },
        });
    }
}
