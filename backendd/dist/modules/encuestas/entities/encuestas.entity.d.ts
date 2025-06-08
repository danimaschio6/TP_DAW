import { Pregunta } from './pregunta.entity';
import { Respuesta } from "src/modules/respuestas/entities/respuesta.entity";
export declare class Encuesta {
    id: number;
    nombre: string;
    preguntas: Pregunta[];
    codigoRespuesta: string;
    codigoResultados: string;
    respuestas: Respuesta[];
}
