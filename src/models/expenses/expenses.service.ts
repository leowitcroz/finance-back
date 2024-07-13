import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { user } from '@prisma/client';

@Injectable()
export class ExpensesService {

    constructor(private readonly prisma: PrismaService) { }

    async findUser(user_id): Promise<user> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: Number(user_id)
            }
        })
        if (!user) {
            throw new Error(`User com ID ${user_id} não encontrado.`);
        }
        else {
            return user;
        }
    }

    async createExpense({ type, price, user_id }) {
        const user = await this.findUser(user_id)
        return this.prisma.expenses.create({
            data: {
                id_user: Number((await user).id),
                price: price,
                type: type
            }
        })
    }

}
