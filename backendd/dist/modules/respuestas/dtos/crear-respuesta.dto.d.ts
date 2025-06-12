export declare class RespuestaAbiertaDto {
    preguntaId: number;
    texto: string;
}
export declare class RespuestaOpcionDto {
    opcionId: number;
}
export declare class RespuestaVerdaderoFalsoDto {
    preguntaId: number;
    valorRespuesta: boolean;
}
export declare class CrearRespuestaDto {
    encuestaId: number;
    respuestasAbiertas?: RespuestaAbiertaDto[];
    respuestasOpciones?: RespuestaOpcionDto[];
    respuestasVerdaderoFalso?: RespuestaVerdaderoFalsoDto[];
}
