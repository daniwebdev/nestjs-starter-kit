import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';

@Injectable()
export class RedisService {

    constructor(
        @InjectRedis('default') private readonly redis: Redis,
    ) {}

    async get(key: string) {
        return JSON.parse(await this.redis.get(key));
    }

    async set(key: string, value: any, ttl?: number) {

        return await this.redis.set(key, JSON.stringify(value));
    }

    // get store() {
    //     return this.redis;
    //     // return this.cacheManager.store
    // }

    async del(key: string) {
        return await this.redis.del(key);
    }

    async keys(pattern?: any) {
        return  await this.redis.keys(pattern);
    }
}
