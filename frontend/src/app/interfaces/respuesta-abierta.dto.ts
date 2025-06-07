import { PreguntaDTO } from "./pregunta.dto";

export interface RespuestaAbiertaDTO {
  id: number;
  pregunta: PreguntaDTO; // La Pregunta es un objeto anidado
  texto: string;
}

