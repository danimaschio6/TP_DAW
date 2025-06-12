export declare class EstadisticaRespuestaAbiertaDto {
    preguntaId: number;
    pregunta: string;
    totalRespuestas: number;
}
export declare class EstadisticaRespuestaOpcionDto {
    preguntaId: number;
    pregunta: string;
    opcionId: number;
    opcion: string;
    votos: number;
}
export declare class EstadisticaRespuestaVerdaderoFalsoDto {
    preguntaId: number;
    pregunta: string;
    totalRespuestas: number;
}
export declare class EstadisticasEncuestaDto {
    totalRespuestas: number;
    respuestasAbiertas: EstadisticaRespuestaAbiertaDto[];
    respuestasOpciones: EstadisticaRespuestaOpcionDto[];
    respuestasVerdaderoFalso: EstadisticaRespuestaVerdaderoFalsoDto[];
}
