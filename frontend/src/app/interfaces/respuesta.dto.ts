import { RespuestaAbiertaDTO } from "./respuesta-abierta.dto";
import { RespuestaOpcionDTO } from "./respuesta-opcion.dto";
import { RespuestaVerdaderoFalsoDTO } from "./respuesta-verdadero-falso.dto";


export interface RespuestaDTO {
  id: number;
  encuestaId: number; 
  fechaCreacion: string; 
  respuestasAbiertas: RespuestaAbiertaDTO[]; 
  respuestasOpciones: RespuestaOpcionDTO[];
  respuestasVerdaderoFalso: RespuestaVerdaderoFalsoDTO[];
}

