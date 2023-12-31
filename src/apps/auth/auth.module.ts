import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserDevice } from 'src/entities/user-device.entity';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { RedisModule } from 'src/shared/redis/redis.module';
import { SendEmailModule } from 'src/shared/send-email/send-email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDevice]),
    RedisModule,
    SendEmailModule
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController]
})

export class AuthModule {}
