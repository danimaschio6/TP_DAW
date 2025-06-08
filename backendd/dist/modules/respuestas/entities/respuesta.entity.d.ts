import { Encuesta } from '../../encuestas/entities/encuestas.entity';
import { RespuestaAbierta } from './respuesta-abierta.entity';
import { RespuestaOpcion } from './respuesta-opcion.entity';
export declare class Respuesta {
    id: number;
    encuesta: Encuesta;
    respuestasAbiertas: RespuestaAbierta[];
    respuestasOpciones: RespuestaOpcion[];
}
