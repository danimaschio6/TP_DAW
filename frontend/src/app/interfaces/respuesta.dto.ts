import { RespuestaAbiertaDTO } from "./respuesta-abierta.dto";
import { RespuestaOpcionDTO } from "./respuesta-opcion.dto";

export interface RespuestaDTO {
    id: number;
    encuesta: {
        id: number;
        nombre: string;
        codigoRespuesta: string;
    };
    fechaCreacion: Date;
    respuestasAbiertas: RespuestaAbiertaDTO[];
    respuestasOpciones: RespuestaOpcionDTO[];
}