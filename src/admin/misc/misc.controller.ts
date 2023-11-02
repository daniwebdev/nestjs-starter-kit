import { Controller, Get, Header } from '@nestjs/common';

@Controller('misc')
export class MiscController {

    @Get('/permissions')
    @Header('content-type', 'text/plain')
    getPermission() {
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
