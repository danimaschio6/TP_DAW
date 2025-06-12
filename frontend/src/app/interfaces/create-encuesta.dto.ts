import { CreatePreguntaDTO } from "./create-pregunta.dto";
import { EncuestaDTO } from "./encuesta.dto";

export interface CreateEncuestaDTO extends Pick<EncuestaDTO, 'nombre'|
'fechaVencimiento'
//DIONI VF
|'descripcion'
//|'habilitada'
//
>{
    preguntas: CreatePreguntaDTO[];
}