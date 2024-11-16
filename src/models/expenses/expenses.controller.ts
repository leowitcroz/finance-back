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

}
