import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { user } from '@prisma/client';

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

    async updateUser(id: number, { email, password }) {
        await this.exist(id)

        const data: any = {}

        if (email) {
            data.email = email;
        }
        if (password) {
            data.password = password
        }

        return this.prisma.user.update({
            where: {
                id
            },
            data
        })
    }

    async delete(id:number) {
        await this.exist(id)
        return this.prisma.user.delete({
            where:{
                id
            }
        })
    }

    async exist(id: number) {
        if (!(await this.findUnique(id))) {
            throw new NotFoundException('The user doesnt exist');
        }
    }
}
