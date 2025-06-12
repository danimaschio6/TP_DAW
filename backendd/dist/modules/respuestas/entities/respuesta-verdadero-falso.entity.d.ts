import { Respuesta } from './respuesta.entity';
import { Pregunta } from 'src/modules/encuestas/entities/pregunta.entity';
export declare class RespuestaVerdaderoFalso {
    id: number;
    respuesta: Respuesta;
    pregunta: Pregunta;
    valorRespuesta: boolean;
}
