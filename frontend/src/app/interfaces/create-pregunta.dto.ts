import { TiposRespuestaEnum } from "../enums/tipos-pregunta.enum";
import { CreateOpcionDTO } from "./create-opcion.dto";

export interface CreatePreguntaDTO {
  numero: number;
  texto: string;
  tipo: TiposRespuestaEnum;
  opciones?: CreateOpcionDTO[];
}