import { PreguntaDTO } from "./pregunta.dto";

export interface RespuestaVerdaderoFalsoDTO {
  id: number;
  pregunta: PreguntaDTO; // La Pregunta es un objeto anidado
  valorRespuesta: boolean;
}

