import { Respuesta } from './respuesta.entity';
import { Pregunta } from '../../encuestas/entities/pregunta.entity';
export declare class RespuestaAbierta {
    id: number;
    texto: string;
    pregunta: Pregunta;
    respuesta: Respuesta;
}
