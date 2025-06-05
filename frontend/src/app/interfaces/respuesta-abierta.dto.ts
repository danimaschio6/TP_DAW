

export interface RespuestaAbiertaDTO {
    id?: number;
    preguntaId: number;
    pregunta?: {
        id: number;
        texto: string;
        orden: number;
    };
    respuesta: string;
}