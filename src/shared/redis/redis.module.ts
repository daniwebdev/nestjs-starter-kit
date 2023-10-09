import { Module } from '@nestjs/common';
import { RedisModule as IoRedisModule } from '@svtslv/nestjs-ioredis';
import { RedisService } from './redis.service';
@Module({
  imports: [

    IoRedisModule.forRootAsync({
      useFactory: async () => ({
          config: {
            url: process.env.REDIS_URL,
          }
      })
    }, 'default'),

  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
