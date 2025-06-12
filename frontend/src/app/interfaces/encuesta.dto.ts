import { PreguntaDTO } from './pregunta.dto'

export interface EncuestaDTO {
  id: number;
  nombre: string;
  descripcion?: string;
  codigoRespuesta: string;
  codigoResultados: string;
  fechaVencimiento?: string|null;//se puede sacar el null?
  preguntas: PreguntaDTO[];
  habilitada: boolean;
}





