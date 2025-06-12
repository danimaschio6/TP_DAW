import { CreatePreguntaDTO } from './create.pregunta.dto';
export declare class CreateEncuestaDTO {
    nombre: string;
    preguntas: CreatePreguntaDTO[];
    fechaVencimiento?: string | null;
}
