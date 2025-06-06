export interface EstadisticasEncuestaDTO {
  encuesta: {
    id: number;
    nombre: string;
  };
  totalRespuestas: number;
  estadisticasPorPregunta: {
    pregunta: {
      id: number;
      numero: number;
      texto: string;
      tipo: string;
    };
    totalRespuestas: number;
    respuestasAbiertas?: string[];
    estadisticasOpciones?: {
      opcion: {
        id: number;
        texto: string;
        numero: number;
      };
      cantidad: number;
      porcentaje: number;
    }[];
  }[];
}