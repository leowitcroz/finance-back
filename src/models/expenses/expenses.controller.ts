import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {

    constructor(private readonly expenses:ExpensesService) {}

    @Post()
    async createExpense(@Body() {type,price,user_id}){
        return this.expenses.createExpense({type,price,user_id})
    }
   
}
