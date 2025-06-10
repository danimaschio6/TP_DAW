export class EstadisticaRespuestaAbiertaDto {
  preguntaId: number;
  pregunta: string;
  totalRespuestas: number;
}

export class EstadisticaRespuestaOpcionDto {
  preguntaId: number;
  pregunta: string;
  opcionId: number;
  opcion: string;
  votos: number;
}

export class EstadisticasEncuestaDto {
  totalRespuestas: number;
  respuestasAbiertas: EstadisticaRespuestaAbiertaDto[];
  respuestasOpciones: EstadisticaRespuestaOpcionDto[];
}