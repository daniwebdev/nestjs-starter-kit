import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: 'Admin'})
    @IsString()
    name: string;
    
    @ApiProperty({example: 'ADMIN'})
    key: string;
    
    @ApiProperty()
    description: string;
}
