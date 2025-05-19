import { TiposRespuestaEnum } from "../enums/tipos-respuesta.enum";
import { CreateOpcionDTO } from './create.opcion.dto';
export declare class CreatePreguntaDTO {
    numero: number;
    texto: string;
    tipo: TiposRespuestaEnum;
    opciones?: CreateOpcionDTO[];
}
