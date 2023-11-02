import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    path: string;

    @ApiProperty()
    actions: string[];
}
