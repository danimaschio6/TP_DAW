import { CreatePreguntaDTO } from './create.pregunta.dto';
export declare class CreateEncuestaDTO {
    nombre: string;
    descripcion?: string;
    preguntas: CreatePreguntaDTO[];
    fechaVencimiento?: string | null;
}
