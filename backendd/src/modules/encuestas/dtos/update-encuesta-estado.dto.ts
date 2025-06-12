// src/encuestas/dtos/update-encuesta-estado.dto.ts
import { IsBoolean } from 'class-validator';

export class UpdateEncuestaEstadoDTO {
  @IsBoolean()
  habilitada: boolean;
}
