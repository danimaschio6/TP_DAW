import { Pregunta } from './pregunta.entity';
import { RespuestaOpcion } from 'src/modules/respuestas/entities/respuesta-opcion.entity';
export declare class Opcion {
    id: number;
    texto: string;
    numero: number;
    pregunta: Pregunta;
    respuestasOpciones: RespuestaOpcion[];
}
