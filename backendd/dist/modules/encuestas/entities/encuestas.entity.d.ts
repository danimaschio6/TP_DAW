import { Pregunta } from './pregunta.entity';
export declare class Encuesta {
    id: number;
    nombre: string;
    descripcion?: string;
    preguntas: Pregunta[];
    codigoRespuesta: string;
    codigoResultados: string;
    habilitada: boolean;
    fechaVencimiento?: Date | null;
}
