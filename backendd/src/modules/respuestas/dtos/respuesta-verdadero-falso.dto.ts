/*
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
*/

//DIONI VF
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateRespuestaVerdaderoFalsoDto {
  @IsBoolean()
  @IsNotEmpty()
  valorRespuesta: boolean;
}

export class RespuestaVerdaderoFalsoResponseDto {
  id: number;
  respuestaId: number;
  valorRespuesta: boolean;
}
//