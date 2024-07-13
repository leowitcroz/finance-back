import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ExpensesController } from './expenses.controller';

@Module({
  providers: [ExpensesService],
  imports: [PrismaModule],
  controllers:[ExpensesController]
})
export class ExpensesModule {}
