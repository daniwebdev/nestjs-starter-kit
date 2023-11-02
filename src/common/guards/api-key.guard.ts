import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {


  private excluded = [
    /^\/$/,
    /^\/webhook(.*)$/,
    /^\/misc(.*)$/,
  ];
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();


    /* disable gurad for path in `exluded` */
    if (this.excluded.some((regex) => regex.test(req.path))) {
      return true;
    }

    /* catch x-api-key from header and verify with the env */
    const key = req.headers['x-api-key'] ?? req.query.api_key
    console.log(key)
    if(key == undefined || key == '') {
      throw new HttpException('X-API-KEY is not provided.', HttpStatus.UNAUTHORIZED);
    }

    if(key != process.env.APP_API_KEY ?? 'sandbox') {
      throw new HttpException('X-API-KEY is not valid.', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
