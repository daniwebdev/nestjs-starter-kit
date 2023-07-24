import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Response } from 'src/utils/response.utils';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @Post('/login')
    async login(
        @Req() req: Request,
        @Body() data: LoginDTO
    ) {
        const loginResponse = await this.authService.login(data);

        return Response.success({
            message: "Your identity accepted, login successful.",
            data: loginResponse,
        });
    }

    @Post('/register')
    async register(
        @Req() req: Request,
        @Body() data: RegisterDTO,
    ) {
        const registerResponse = await this.authService.register(data, req);

        return Response.success({
            message: "Your account has been created.",
            data: registerResponse,
        });
    }
}
