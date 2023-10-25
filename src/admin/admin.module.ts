import { Module } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { UserModule } from "src/apps/user/user.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
    imports: [
        UsersModule,
        RolesModule,
        PermissionsModule,
    ]
})
export class AdminModule {}