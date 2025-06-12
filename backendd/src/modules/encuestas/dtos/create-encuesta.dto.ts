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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEncuestaDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ type: [CreatePreguntaDTO] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePreguntaDTO)
  preguntas: CreatePreguntaDTO[];

  @ApiProperty()
  @IsISO8601()
  @IsOptional()
  fechaVencimiento?: string | null;
}
