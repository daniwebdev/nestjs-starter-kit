import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Exclude } from "class-transformer";

export class CreateRoleDto {

    @ApiProperty({example: 'Admin'})
    name: string;
    
    @ApiProperty({example: 'ADMIN'})
    key: string;
    
    @ApiProperty()
    description: string;
}
