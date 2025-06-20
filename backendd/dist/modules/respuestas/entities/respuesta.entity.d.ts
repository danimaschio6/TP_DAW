import { Encuesta } from '../../encuestas/entities/encuestas.entity';
import { RespuestaAbierta } from './respuesta-abierta.entity';
import { RespuestaOpcion } from './respuesta-opcion.entity';
import { RespuestaVerdaderoFalso } from './respuesta-verdadero-falso.entity';
export declare class Respuesta {
    id: number;
    encuesta: Encuesta;
    fechaCreacion: Date;
    respuestasAbiertas: RespuestaAbierta[];
    respuestasOpciones: RespuestaOpcion[];
    respuestasVerdaderoFalso: RespuestaVerdaderoFalso[];
}
