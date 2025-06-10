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

export class RespuestaResponseDto {
  id: number;
  encuestaId: number;
  fechaCreacion: Date;
  respuestasAbiertas: RespuestaAbiertaResponseDto[];
  respuestasOpciones: RespuestaOpcionResponseDto[];
}