import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService, CreateUserDto } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(dto: CreateUserDto) {
        // Verifica se e-mail já existe
        const existing = await this.usersService.findByEmail(dto.email);
        if (existing) {
            throw new ConflictException('E-mail já cadastrado.');
        }

        const user = await this.usersService.create(dto);
        const token = this.createToken(user);

        return { user, access_token: token };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user || !user.passwordHash) {
            throw new UnauthorizedException('Credenciais inválidas.');
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) {
            throw new UnauthorizedException('Credenciais inválidas.');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Conta desativada. Entre em contato com o suporte.');
        }

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        return { user: safeUser, access_token: this.createToken(safeUser) };
    }

    async getProfile(userId: number) {
        return this.usersService.findById(userId);
    }

    private createToken(user: { id: number; email: string; role: string }) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return this.jwtService.sign(payload);
    }
}
