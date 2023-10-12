import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CoordinateDTO {
    @ApiProperty({example: 6.23499})
    @IsNumber()
    latitude: number;

    @ApiProperty({example: -18.23499})
    @IsNumber()
    longitude: number;
}
