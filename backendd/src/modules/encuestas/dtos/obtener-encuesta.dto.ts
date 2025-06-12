import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';

export class ObtenerEncuestaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @ApiProperty({ enum: CodigoTipoEnum })
  @IsNotEmpty()
  @IsEnum(CodigoTipoEnum, { message: 'tipo debe ser RESPUESTA o RESULTADOS' })
  tipo: CodigoTipoEnum;
}
