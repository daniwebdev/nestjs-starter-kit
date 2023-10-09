import { Controller, Get, Query } from '@nestjs/common';
import { Response } from 'src/common/utils';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {


    constructor(private configService: ConfigService) { }

    @Get()
    async getConfig(@Query('key') key: string) {

        const response = await this.configService.getConfig(key);

        return Response.success({
            message: "",
            data: response,
        })
    }
}
