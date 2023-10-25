import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsString, IsEmail, MinLength, Matches, IsNotEmpty } from 'class-validator';
import { Match } from "src/common/decorators/validation.decorator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @MinLength(8)
    password: string;
    
    @ApiProperty()
    @Match('password', { message: 'Confirm password must match the password'})
    confirmPassword: string;
}
