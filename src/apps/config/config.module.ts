import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from 'src/entities/app-config.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppConfig]),
  ],
  providers: [ConfigService],
  controllers: [ConfigController]
})
export class ConfigModule {}
