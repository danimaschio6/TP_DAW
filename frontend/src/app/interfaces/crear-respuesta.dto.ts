import { RespuestaAbiertaDTO } from "./respuesta-abierta.dto";
import { RespuestaOpcionDTO } from "./respuesta-opcion.dto";

//DIONI VF
import { RespuestaVerdaderoFalsoDTO } from "./respuesta-verdadero-falso.dto";
//

export interface CrearRespuestaDTO {
  encuestaId: number;
  respuestasAbiertas: RespuestaAbiertaDTO[];
  respuestasOpciones: RespuestaOpcionDTO[];
  //DIONI VF
  respuestasVerdaderoFalso: RespuestaVerdaderoFalsoDTO[];
  //
}