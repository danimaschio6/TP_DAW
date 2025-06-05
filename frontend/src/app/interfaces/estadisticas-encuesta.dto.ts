export interface EstadisticasEncuestaDTO {
    encuestaId: number;
    nombreEncuesta: string;
    totalRespuestas: number;
    fechaCreacion: Date;
    estadisticasPorPregunta: EstadisticaPreguntaDTO[];
}

export interface EstadisticaPreguntaDTO {
    preguntaId: number;
    textoPregunta: string;
    tipoPregunta: string;
    orden: number;
    totalRespuestas: number;
    // Para preguntas abiertas
    respuestasAbiertas?: string[];
    // Para preguntas de opción múltiple
    estadisticasOpciones?: EstadisticaOpcionDTO[];
}

export interface EstadisticaOpcionDTO {
    opcionId: number;
    textoOpcion: string;
    cantidadRespuestas: number;
    porcentaje: number;
    orden: number;
}