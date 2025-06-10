import { RespuestaAbiertaDTO } from "./respuesta-abierta.dto";
import { RespuestaOpcionDTO } from "./respuesta-opcion.dto";


export interface RespuestaDTO {
  id: number;
  encuestaId: number; 
  fechaCreacion: string; 
  respuestasAbiertas: RespuestaAbiertaDTO[]; 
  respuestasOpciones: RespuestaOpcionDTO[];
}

