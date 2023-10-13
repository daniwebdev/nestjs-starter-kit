import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Unique } from "typeorm";
import { CoordinateDTO } from "./coordinate.dto";
import { DeviceDTO } from "./device.dto";

export class RegisterDTO {

    @ApiProperty({example: "John Doe"})
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "john.doe"})
    @IsNotEmpty()
    @Unique('users', ['username'])
    username: string;

    @ApiProperty({example: "john.doe@mail.com"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "085717453300"})
    phone: string;

    @ApiProperty({example: "secret"})
    password: string;

    @ApiProperty()
    coordinate: CoordinateDTO;

    @ApiProperty()
    device: DeviceDTO;

    @ApiProperty({example: ""})
    refferal_code: string;
}