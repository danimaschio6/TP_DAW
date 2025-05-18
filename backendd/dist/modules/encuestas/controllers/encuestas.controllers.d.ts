import { EncuestasService } from "../services/encuestas.services";
import { CreateEncuestaDTO } from "../dtos/create-encuesta.dto";
import { Encuesta } from "../entities/encuestas.entity";
import { ObtenerEncuestaDto } from '../dtos/obtener-encuesta.dto';
export declare class EncuestaController {
    private encuestasService;
    constructor(encuestasService: EncuestasService);
    crearEncuesta(dto: CreateEncuestaDTO): Promise<{
        id: number;
        codigoRespuesta: string;
        codigoResultados: string;
    }>;
    obtenerEncuesta(id: number, dto: ObtenerEncuestaDto): Promise<Encuesta>;
}
