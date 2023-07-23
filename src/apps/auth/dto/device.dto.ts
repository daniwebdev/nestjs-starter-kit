import { IsNotEmpty } from "class-validator";

enum PlatformEnum {Android, iOS, Desktop, Web}

export class DeviceDTO {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    os: string;
}
