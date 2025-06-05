import { RespuestaAbiertaDTO } from "./respuesta-abierta.dto";
import { RespuestaOpcionDTO } from "./respuesta-opcion.dto";

export interface CrearRespuestaDTO {
    encuestaId: number;
    respuestasAbiertas: RespuestaAbiertaDTO[];
    respuestasOpciones: RespuestaOpcionDTO[];
}

