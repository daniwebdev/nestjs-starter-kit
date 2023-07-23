import { IsNotEmpty } from "class-validator";
import { Unique } from "typeorm";
import { CoordinateDTO } from "./coordinate.dto";
import { DeviceDTO } from "./device.dto";

export class RegisterDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Unique('users', ['username'])
    username: string;

    email: string;

    phone: string;

    password: string;

    coordinate: CoordinateDTO;

    device: DeviceDTO;
}