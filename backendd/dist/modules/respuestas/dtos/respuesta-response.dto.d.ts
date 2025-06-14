export declare class RespuestaAbiertaResponseDto {
    id: number;
    preguntaId: number;
    preguntaTexto: string;
    texto: string;
}
export declare class RespuestaOpcionResponseDto {
    id: number;
    opcionId: number;
    opcionTexto: string;
    preguntaId: number;
    preguntaTexto: string;
}
export declare class RespuestaVerdaderoFalsoDto {
    id: number;
    preguntaId: number;
    preguntaTexto: string;
    valorRespuesta: boolean;
}
export declare class RespuestaResponseDto {
    id: number;
    encuestaId: number;
    fechaCreacion: Date;
    respuestasAbiertas: RespuestaAbiertaResponseDto[];
    respuestasOpciones: RespuestaOpcionResponseDto[];
    respuestasVerdaderoFalso: RespuestaVerdaderoFalsoDto[];
}
