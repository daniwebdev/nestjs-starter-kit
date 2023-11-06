import { Controller, Get, Header, Req } from '@nestjs/common';
import { Request } from 'express';
import { UseJwtGuard } from 'src/common/guards/jwt.guard';
import { MiscService } from './misc.service';

@Controller('misc')
export class MiscController {

    constructor(
        private miscService: MiscService,
    ) {}

    @Get('/permissions')
    @UseJwtGuard()
    // @Header('content-type', 'text/plain')
    async getPermission(
        @Req() req: Request
    ) {
        console.log(req.user);

        return await this.miscService.getUserPermission(req.user.id);

        return `
            p, admin, posts, (list)|(create)
            p, admin, posts/*, (edit)|(show)|(delete)
            p, admin, posts/*, field

            p, admin, users, (list)|(create)
            p, admin, users/*, (edit)|(show)|(delete)

            p, admin, roles, (list)|(create)
            p, admin, roles/*, (edit)|(show)|(delete)

            p, admin, access_control

            p, admin, permissions, (list)|(create)
            p, admin, permissions/*, (edit)|(show)|(delete)

            p, editor, posts, (list)|(create)
            p, editor, posts/*, (edit)|(show)
            p, editor, posts/hit, field, deny

            p, editor, categories, list
        `;
    }
}
