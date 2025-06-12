export class RespuestaAbiertaResponseDto {
  id: number;
  preguntaId: number;
  preguntaTexto: string;
  texto: string;
}

export class RespuestaOpcionResponseDto {
  id: number;
  opcionId: number;
  opcionTexto: string;
  preguntaId: number;
  preguntaTexto: string;
}

//DIONI VF
export class RespuestaVerdaderoFalsoDto {
  id: number;
  preguntaId: number;
  preguntaTexto: string;
  valorRespuesta: boolean;
}
//

export class RespuestaResponseDto {
  id: number;
  encuestaId: number;
  fechaCreacion: Date;
  respuestasAbiertas: RespuestaAbiertaResponseDto[];
  respuestasOpciones: RespuestaOpcionResponseDto[];
  //DIONI VF
  respuestasVerdaderoFalso: RespuestaVerdaderoFalsoDto[];
  //
}