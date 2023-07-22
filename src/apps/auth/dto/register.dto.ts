import { Device, ProviderLogin } from "./login.dto";

export class RegisterDTO {
    name: string;
    username: string;
    email: string;
    phone: string;
    provider: ProviderLogin;
    device: Device;
}