import { forwardRef, Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ExpensesController } from './expenses.controller';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ExpensesService],
  imports: [PrismaModule, forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  controllers: [ExpensesController]
})
export class ExpensesModule { }
