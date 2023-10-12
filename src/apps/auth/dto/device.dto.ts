import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

enum PlatformEnum {Android, iOS, Desktop, Web}

export class DeviceDTO {
    @ApiProperty({example: 'we7r12i'})
    @IsNotEmpty()
    id: string;
    
    @ApiProperty({example: "Iphone 14 Pro Max"})
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({example: "Apple"})
    @IsNotEmpty()
    brand: string;
    
    @ApiProperty({example: "iOS 17"})
    @IsNotEmpty()
    os: string;
}
