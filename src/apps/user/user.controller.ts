import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UseJwtGuard } from 'src/filters/jwt.guard';
import { Response } from 'src/utils';
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
}
