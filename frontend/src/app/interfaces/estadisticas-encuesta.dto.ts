// Estructura probable de tu EstadisticasEncuestaDTO
export interface EstadisticasEncuestaDTO {
  encuestaId: number;
  titulo: string; // ← Probablemente sea esto, no 'nombreEncuesta'
  totalRespuestas: number;
  estadisticasPorPregunta: EstadisticaPreguntaDTO[]; // ← Probablemente sea esto
}

export interface EstadisticaPreguntaDTO {
  preguntaId: number;
  textoPregunta: string;
  tipo: 'opcion_multiple' | 'opcion_unica' | 'abierta';
  // Para preguntas de opción múltiple:
  estadisticasOpciones?: {
    opcionId: number;
    textoOpcion: string;
    cantidadRespuestas: number;
    porcentaje: number;
  }[];
  // Para preguntas abiertas:
  respuestasAbiertas?: string[];
}

export interface EstadisticaOpcionDTO {
  opcionId: number;
  textoOpcion: string;
  cantidadRespuestas: number;
  porcentaje: number;
}