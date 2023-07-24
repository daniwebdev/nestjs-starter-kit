import { IsNumber } from "class-validator";

export class CoordinateDTO {
    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;
}