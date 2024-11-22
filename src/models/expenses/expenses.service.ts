import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { user } from '@prisma/client';
import exp from 'constants';

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

    async createExpense({ type, price, user_id, income }) {
        const user = await this.findUser(user_id)
        return this.prisma.expenses.create({
            data: {
                id_user: Number((await user).id),
                price: price,
                type: type,
                income: income,
            }
        })
    }

    async getAllExpenses({ user_id, }) {

        const user = this.findUser(user_id);

        if (!user) {
            throw new Error(`User com ID ${user_id} não encontrado.`);
        }

        const expenses = await this.prisma.expenses.findMany({
            where: {
                id_user: user_id,
            }
        })

        return expenses;
    }

    async getIncomes({ user_id }) {
        const expenses = await this.prisma.expenses.findMany({
            where: {
                id_user: user_id,
            }
        })

        const incomesByMonth = {};
        
        expenses.forEach((expense) => {

            if (Number(expense.income) > 0) {
                const month = expense.date.getMonth() + 1;

                if (incomesByMonth[month]) {
                    incomesByMonth[month] += Number(expense.income);
                } else {
                    incomesByMonth[month] = Number(expense.income);
                }
            }
        });

        const result = Object.entries(incomesByMonth).map(([month, totalIncome]) => ({
            month: Number(month),
            totalIncome,
        }));

        return result;
    }

    async getExpneses({ user_id }) {

        const expenses = await this.prisma.expenses.findMany({
            where: {
                id_user: user_id,
            }
        })

        const expensesByMonth = {};
        
        expenses.forEach((expense) => {

            if (Number(expense.price) > 0) {
                const month = expense.date.getMonth() + 1;

                if (expensesByMonth[month]) {
                    expensesByMonth[month] += Number(expense.price);
                } else {
                    expensesByMonth[month] = Number(expense.price);
                }
            }
        });

        const result = Object.entries(expensesByMonth).map(([month, totalExpense]) => ({
            month: Number(month),
            totalExpense,
        }));

        return result;

    }
}
