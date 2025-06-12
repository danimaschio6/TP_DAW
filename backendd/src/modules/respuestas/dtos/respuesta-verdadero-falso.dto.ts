import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateRespuestaVerdaderoFalsoDto {
  @IsNumber()
  @IsNotEmpty()
  opcionId: number;
}

export class RespuestaVerdaderoFalsoResponseDto {
  id: number;
  respuestaId: number;
  opcionId: number;
} 