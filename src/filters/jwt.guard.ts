import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export function UseJwtGuard() {
    return applyDecorators(
        UseGuards(AuthGuard('jwt')),
    )
}

export function UseJwtRefreshGuard() {
    return applyDecorators(
        UseGuards(AuthGuard('jwt-refresh')),
    )
}