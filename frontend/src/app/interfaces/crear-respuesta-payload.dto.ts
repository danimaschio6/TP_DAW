export interface RespuestaAbiertaPayloadDTO {
  preguntaId: number;
  texto: string;
}

export interface RespuestaOpcionPayloadDTO {
  opcionId: number;
}

export interface RespuestaVerdaderoFalsoPayloadDTO {
  preguntaId: number;
  valorRespuesta: boolean;
}

export interface CrearRespuestaPayloadDTO {
  encuestaId: number;
  respuestasAbiertas?: RespuestaAbiertaPayloadDTO[];
  respuestasOpciones?: RespuestaOpcionPayloadDTO[];
  respuestasVerdaderoFalso?: RespuestaVerdaderoFalsoPayloadDTO[];
}