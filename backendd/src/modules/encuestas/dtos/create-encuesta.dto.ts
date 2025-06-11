import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePreguntaDTO } from './create.pregunta.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEncuestaDTO {
  @ApiProperty()  // para documentacion
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ type: [CreatePreguntaDTO] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePreguntaDTO)
  preguntas: CreatePreguntaDTO[];

  //DIONI fecha_vencimiento
  @ApiProperty()
  @IsISO8601()
  @IsOptional()
  fechaVencimiento?: string|null;
  //
}
