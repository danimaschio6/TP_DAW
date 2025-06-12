import { Pregunta } from './pregunta.entity';
export declare class Encuesta {
    id: number;
    nombre: string;
    preguntas: Pregunta[];
    codigoRespuesta: string;
    codigoResultados: string;
    fechaVencimiento?: Date | null;
    habilitada: boolean;
}
