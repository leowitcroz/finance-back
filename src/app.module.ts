import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ExpensesController } from './models/expenses/expenses.controller';
import { ExpensesModule } from './models/expenses/expenses.module';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [ forwardRef(() => AuthModule), ExpensesModule, UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
