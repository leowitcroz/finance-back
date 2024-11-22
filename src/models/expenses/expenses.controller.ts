import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ExpensesService } from './expenses.service';
import { AuthGuard } from '../../guard/auth.Guard';

@Controller('expenses')
@UseGuards(AuthGuard)
export class ExpensesController {

    constructor(private readonly expenses: ExpensesService) { }

    @Post()
    async createExpense(@Body() { type, price, user_id, income }) {
        return this.expenses.createExpense({ type, price, user_id, income })
    }

    @Get(':id')
    async getAllExpenses(@Param('id', ParseIntPipe) user_id) {
        return this.expenses.getAllExpenses({ user_id })
    }

    @Get('incomes/:id')
    async getIncomes(@Param('id', ParseIntPipe) user_id) {
        return this.expenses.getIncomes({ user_id })
    }

    @Get('prices/:id')
    async getExpenses(@Param('id', ParseIntPipe) user_id) {
        return this.expenses.getExpneses({ user_id })
    }

}
