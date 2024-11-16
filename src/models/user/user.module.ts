import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[PrismaModule, forwardRef(() => AuthModule)],
  exports:[UserService]
})
export class UserModule {}
