import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';

@Injectable()
export class RedisService {

    constructor(
        // @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRedis('real-connection') private readonly redisRealConnection: Redis,
        @InjectRedis('demo-connection') private readonly redisDemoConnection: Redis,
    ) {}

    async get(key: string) {
        if(key.indexOf('demo-') > -1) {
            return await this.redisDemoConnection.get(key);
        }
        return await this.redisRealConnection.get(key);
        // return this.cacheManager.get(key);
    }

    async set(key: string, value: any, ttl?: number) {
        console.log('🔥 🔥 🔥 🔥',key, key.indexOf('demo-'));
        if(key.indexOf('demo-') != -1) {
            return await this.redisDemoConnection.set(key, value);
        }
        return await this.redisRealConnection.set(key, value);
        // await this.cacheManager.set(key, value, ttl)
    }

    // get store() {
    //     return this.redisRealConnection;
    //     // return this.cacheManager.store
    // }

    async del(key: string) {
        if(key.indexOf('demo-') > -1) {
            return await this.redisDemoConnection.del(key);
        }
        return await this.redisRealConnection.del(key);
        // await this.cacheManager.store.del(key);
    }

    async keys(pattern?: any) {
        if(pattern.indexOf('demo') > -1) {
            return await this.redisDemoConnection.keys(pattern);
        }
        return  await this.redisRealConnection.keys(pattern);
        // return this.store.keys(pattern);
    }
}
