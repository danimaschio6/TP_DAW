import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsISO8601, IsNotEmpty, IsUUID } from "class-validator";
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum'



export class ObtenerEncuestaDto {
    @ApiProperty()
    @IsUUID('4')
    @IsNotEmpty()
    codigo: string; 

    @ApiProperty({enum: CodigoTipoEnum})
    @IsEnum(CodigoTipoEnum)
    @IsNotEmpty()
    tipo: CodigoTipoEnum;

    //DIONI fecha_vencimiento
    @ApiProperty()
    @IsISO8601()
    fechaVencimiento?: string;
    //
}