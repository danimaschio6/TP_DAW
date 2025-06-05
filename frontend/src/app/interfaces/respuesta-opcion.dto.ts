

export interface RespuestaOpcionDTO {
    id?: number;
    preguntaId: number;
    pregunta?: {
        id: number;
        texto: string;
        orden: number;
    };
    opcionId: number;
    opcion?: {
        id: number;
        texto: string;
        orden: number;
    };
}