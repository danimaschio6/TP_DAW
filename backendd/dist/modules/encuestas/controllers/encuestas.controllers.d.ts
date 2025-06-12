import { EncuestasService } from "../services/encuestas.services";
import { CreateEncuestaDTO } from "../dtos/create-encuesta.dto";
import { Encuesta } from "../entities/encuestas.entity";
import { ObtenerEncuestaDto } from '../dtos/obtener-encuesta.dto';
import { UpdateEncuestaEstadoDTO } from "../dtos/update-encuesta-estado.dto";
export declare class EncuestaController {
    private encuestasService;
    constructor(encuestasService: EncuestasService);
    crearEncuesta(dto: CreateEncuestaDTO): Promise<{
        id: number;
        codigoRespuesta: string;
        codigoResultados: string;
    }>;
    obtenerEncuesta(id: number, dto: ObtenerEncuestaDto): Promise<Encuesta>;
    obtenerEncuestaPorCodigoRespuesta(codigo: string): Promise<Encuesta>;
    obtenerEncuestaPorCodigoResultados(codigo: string): Promise<Encuesta>;
    getAllEncuestas(): Promise<Encuesta[]>;
    updateEncuestaEstado(id: number, dto: UpdateEncuestaEstadoDTO): Promise<Encuesta>;
}
