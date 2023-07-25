import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { RedisService } from 'src/modules/redis/redis.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        configService: ConfigService,
        private redisService: RedisService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate(payload: any) {
        const data = await this.redisService.get(`user-data:${payload.id}`) ?? payload;
        console.log(data);
        return data;
    }

}