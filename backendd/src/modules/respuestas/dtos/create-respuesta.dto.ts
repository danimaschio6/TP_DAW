import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TiposRespuestaEnum } from '../enums/tipo-respuesta.enum';

export class RespuestaItemDTO {
  @IsUUID()
  @IsNotEmpty()
  idPregunta: string;

  @IsEnum(TiposRespuestaEnum)
  tipo: TiposRespuestaEnum;

  @IsOptional()
  @IsString()
  texto?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  opciones?: string[];
}

export class CreateRespuestaDTO {
  @IsUUID()
  @IsNotEmpty()
  idEncuesta: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RespuestaItemDTO)
  respuestas: RespuestaItemDTO[];
}
