declare namespace Express {
    export interface Request {
        user: UserInAuth | undefined
    }
}

type UserInAuth = {
    id: number,
    name: string,
    email: string,
    deviceUniqueId: string,
    fcm_token?: string,
}