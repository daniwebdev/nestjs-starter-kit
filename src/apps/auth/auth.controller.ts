import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UseJwtGuard, UseJwtRefreshGuard } from 'src/common/guards/jwt.guard';
import { Response } from 'src/common/utils/response.utils';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Auth")
@ApiSecurity('api-key')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @ApiBody({type: LoginDTO})
    async login(
        @I18n() i18n: I18nContext,
        @Req() req: Request,
        @Body() data: LoginDTO
    ) {
        const loginResponse = await this.authService.login(data, req);

        return Response.success({
            message: i18n.t('response.login.success'),
            data: loginResponse,
        });
    }

    @UseJwtRefreshGuard()
    @ApiBearerAuth()
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(
        @I18n() i18n: I18nContext,
        @Req() req: Request,
    ) {

        const refreshResponse = await this.authService.refresh(req);

        return Response.success({
            message: i18n.t('auth.refresh.response-success'),
            data: refreshResponse,
        });
    }

    @Post('/register')
    @ApiBearerAuth('RefreshToken')
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({type: () => RegisterDTO})
    async register(
        @I18n() i18n: I18nContext,
        @Req() req: Request,
        @Body() data: RegisterDTO,
    ) {

        const registerResponse = await this.authService.register(data, req);

        return Response.success({
            message: i18n.t('response.register.success'),
            data: registerResponse,
        });
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    @UseJwtGuard()
    async logout(
        @I18n() i18n: I18nContext,
        @Req() req: Request,
    ) {
        try {
            await this.authService.logout(req.user);

            return Response.success({
                message: i18n.t('response.logout.success'),
            });
        } catch (error) {
            
        }
    }
}
