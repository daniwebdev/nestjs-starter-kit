import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleAsyncOptions = {

    useFactory: () => {
        console.log(process.env.JWT_TOKEN_SECRET)
        return {
            secret: process.env.JWT_TOKEN_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_TOKEN_EXPIRED|| 1000 * 60 * 60 * 24 * 30, //
            }
        }
    }
}