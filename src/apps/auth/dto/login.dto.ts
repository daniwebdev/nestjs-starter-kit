export class LoginDTO {
    identity: string;
    password: string;
    provider: ProviderLogin;
    device: Device;
}

export class ProviderLogin {
    name: string;
    id: string;
    token: string
}

export class Device {
    uniqueId: string;
    name: string;
    os: string;
    platform: 'WEB'|'MOBILE'|'DESKTOP'
}

// "identity": null,
// "password": null,
// "provider": {
//   "name": null,
//   "id": null,
//   "token": null
// }