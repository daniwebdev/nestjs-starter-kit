import { Module } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { UserModule } from "src/apps/user/user.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from './roles/roles.module';

@Module({
    imports: [
        UsersModule,
        RolesModule,
    ]
})
export class AdminModule {}