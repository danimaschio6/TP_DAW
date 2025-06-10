import { Respuesta } from './respuesta.entity';
import { Pregunta } from '../../encuestas/entities/pregunta.entity';
export declare class RespuestaAbierta {
    id: number;
    respuesta: Respuesta;
    pregunta: Pregunta;
    texto: string;
}
