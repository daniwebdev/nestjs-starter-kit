import { IsNotEmpty } from "class-validator";
import { CoordinateDTO } from "./coordinate.dto";
import { DeviceDTO } from "./device.dto";
export class LoginDTO {
    @IsNotEmpty()
    identity: string;

    @IsNotEmpty()
    password: string;

    device: DeviceDTO;

    coordinate: CoordinateDTO;
}



// "identity": null,
// "password": null,
// "provider": {
//   "name": null,
//   "id": null,
//   "token": null
// }