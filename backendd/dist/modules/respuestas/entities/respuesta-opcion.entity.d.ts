import { Respuesta } from './respuesta.entity';
import { Opcion } from '../../encuestas/entities/opcion.entity';
export declare class RespuestaOpcion {
    id: number;
    respuesta: Respuesta;
    opcion: Opcion;
}
