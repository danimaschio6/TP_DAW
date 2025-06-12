import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsISO8601, IsUUID } from 'class-validator';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';

export class ObtenerEncuestaDto {
  @ApiProperty()
  @IsUUID('4')
  //@IsString()//es mas especifico uuid
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ enum: CodigoTipoEnum })
  //@IsEnum(CodigoTipoEnum, { message: 'tipo debe ser RESPUESTA o RESULTADOS' })
  @IsEnum(CodigoTipoEnum)
  @IsNotEmpty()
  tipo: CodigoTipoEnum;

  //DIONI fecha_vencimiento
    @ApiProperty()
    @IsISO8601()
    fechaVencimiento?: string;
  //
}
