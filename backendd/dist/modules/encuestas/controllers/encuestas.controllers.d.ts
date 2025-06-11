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
    obtenerTodasLasEncuestas(): Promise<Encuesta[]>;
    obtenerEncuesta(id: number, dto: ObtenerEncuestaDto): Promise<Encuesta>;
    obtenerEncuestaPorCodigoRespuesta(codigo: string): Promise<Encuesta>;
    obtenerEncuestaPorCodigoResultados(codigo: string): Promise<Encuesta>;
    actualizarEstadoEncuesta(id: number, body: {
        habilitada: boolean;
    }): Promise<Encuesta>;
    validarEncuestaParaResponder(codigo: string): Promise<{
        valida: boolean;
        mensaje?: string;
    }>;
}
