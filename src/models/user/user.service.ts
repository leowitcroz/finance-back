import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.user.findMany()
    }

    async findUnique(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async createUser({ email, password }) {
        return this.prisma.user.create({
            data: {
                email: email,
                password: password
            }
        })
    }
}
