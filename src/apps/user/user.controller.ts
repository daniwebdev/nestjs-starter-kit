import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { UseJwtGuard } from 'src/common/filters/jwt.guard';
import { Response } from 'src/common/utils';
import { UpdateUserDTO } from './update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseJwtGuard()
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @Get()
    async getUser(@Req() req: Request) {

        return Response.success({
            message: "Success showing user data",
            data: await this.userService.getUser(req.user),
        });
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    updateUserData(
        @Body() data: UpdateUserDTO,
        @Req() req: Request,
    ) {

        const response = this.userService.updateUserData(data, req.user);
    }

    @Get('availability')
    async usernameAvailability(@Query('username') username: string) {
        //

        const response = await this.userService.checkAvailability(username);

        return Response.success({
            message: response
        });
    }
}
