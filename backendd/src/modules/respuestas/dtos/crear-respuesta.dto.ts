
import { IsArray, IsNumber, IsString, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class RespuestaAbiertaDto {
  @IsNumber()
  @IsNotEmpty()
  preguntaId: number;

  @IsString()
  @IsNotEmpty()
  texto: string;
}

export class RespuestaOpcionDto {
  @IsNumber()
  @IsNotEmpty()
  opcionId: number;
}

export class CrearRespuestaDto {
  @IsNumber()
  @IsNotEmpty()
  encuestaId: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RespuestaAbiertaDto)
  respuestasAbiertas?: RespuestaAbiertaDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RespuestaOpcionDto)
  respuestasOpciones?: RespuestaOpcionDto[];
}