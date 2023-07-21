// import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisModule as IoRedisModule } from '@svtslv/nestjs-ioredis';
// import { redisStore } from 'cache-manager-redis-store';
import { RedisService } from './redis.service';
@Module({
  imports: [
    // CacheModule.registerAsync({
    //   isGlobal: true,

    //   useFactory: async () => ({
    //     store: <> <unknown> redisStore,
    //     url: process.env.REDIS_URL,
    //   }),

    // }),

    IoRedisModule.forRootAsync({
      useFactory: async () => ({
          config: {
            url: process.env.REDIS_URL,
          }
      })
    }, 'real-connection'),

    IoRedisModule.forRootAsync({
      useFactory: async  () => ({
          config: {
            url: process.env.REDIS_DEMO_URL,
          }
      })
    }, 'demo-connection')
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
