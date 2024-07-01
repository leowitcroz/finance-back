import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ forwardRef(() => AuthModule),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
