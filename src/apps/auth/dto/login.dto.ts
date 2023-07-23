import { IsNotEmpty } from "class-validator";
import { DeviceDTO } from "./device.dto";
export class LoginDTO {
    @IsNotEmpty()
    identity: string;

    @IsNotEmpty()
    password: string;

    device: DeviceDTO;
}



// "identity": null,
// "password": null,
// "provider": {
//   "name": null,
//   "id": null,
//   "token": null
// }