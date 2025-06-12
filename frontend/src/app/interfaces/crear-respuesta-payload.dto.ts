export interface RespuestaAbiertaPayloadDTO {
  preguntaId: number;
  texto: string;
}

export interface RespuestaOpcionPayloadDTO {
  opcionId: number;
}

export interface CrearRespuestaPayloadDTO {
  encuestaId: number;
  respuestasAbiertas?: RespuestaAbiertaPayloadDTO[];
  respuestasOpciones?: RespuestaOpcionPayloadDTO[];

  //DIONI VF
  respuestasVF?: RespuestaVFPayloadDTO[];
  //
}

//DIONI VF
export interface RespuestaVFPayloadDTO {
  valor: boolean;
}
//