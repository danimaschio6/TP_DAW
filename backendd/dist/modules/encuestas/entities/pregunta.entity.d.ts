import { Encuesta } from './encuestas.entity';
import { Opcion } from './opcion.entity';
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';
export declare class Pregunta {
    id: number;
    numero: number;
    texto: string;
    tipo: TiposRespuestaEnum;
    encuesta: Encuesta;
    opciones: Opcion[];
}
