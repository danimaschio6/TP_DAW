
import { IsArray, IsNumber, IsString, IsNotEmpty, ValidateNested, IsOptional, IsBoolean } from 'class-validator';
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

//DIONI VF
export class RespuestaVerdaderoFalsoDto {
  @IsNumber()
  @IsNotEmpty()
  preguntaId: number;

  @IsBoolean()
  @IsNotEmpty()
  valorRespuesta: boolean;
}
//

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

  //DIONI VF
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RespuestaVerdaderoFalsoDto)
  respuestasVerdaderoFalso?: RespuestaVerdaderoFalsoDto[];
  //
}