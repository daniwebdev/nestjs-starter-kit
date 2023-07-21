import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {


  private excluded = [
    /^\/$/,
    /^\/webhook(.*)$/,
    /^\/(.*)chart(.*)$/,
    /^\/(.*)tradingview(.*)$/
  ];
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();


    if (this.excluded.some((regex) => regex.test(req.path))) {
      return true;
    }
    // if(this.excluded.indexOf(req.path) > -1) {
    //   return true;
    // }
    // this.excluded.forEach(path => {
    //   if(req.path.matchAll(RegExp(/path/)))
    // });



    const key = req.headers['x-api-key'] ?? req.query.api_key

    if(key == undefined || key == '') {
      throw new HttpException('X-API-KEY is not provided.', HttpStatus.UNAUTHORIZED);
    }

    if(key != process.env.APP_API_KEY ?? 'intervest-sandbox') {
      throw new HttpException('X-API-KEY is not valid.', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
