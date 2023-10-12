import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CoordinateDTO } from "./coordinate.dto";
import { DeviceDTO } from "./device.dto";
export class LoginDTO {
    @ApiProperty({example: "john@doe.com"})
    @IsNotEmpty()
    identity: string;
    
    @ApiProperty({example: "secret"})
    @IsNotEmpty()
    password: string;
    
    @ApiProperty()
    device: DeviceDTO;
    
    @ApiProperty()
    coordinate: CoordinateDTO;
}



// "identity": null,
// "password": null,
// "provider": {
//   "name": null,
//   "id": null,
//   "token": null
// }