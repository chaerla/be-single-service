import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TOKEN,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
