import { RespuestasService } from '../services/respuestas.service';
import { CrearRespuestaDto } from '../dtos/crear-respuesta.dto';
export declare class RespuestasController {
    private readonly respuestasService;
    constructor(respuestasService: RespuestasService);
    crearRespuesta(crearRespuestaDto: CrearRespuestaDto): Promise<import("../entities/respuesta.entity").Respuesta>;
    obtenerRespuesta(id: number): Promise<import("../entities/respuesta.entity").Respuesta>;
    obtenerRespuestasPorEncuesta(encuestaId: number): Promise<import("../entities/respuesta.entity").Respuesta[]>;
    obtenerEstadisticasEncuesta(encuestaId: number): Promise<{
        totalRespuestas: number;
        respuestasAbiertas: any[];
        respuestasOpciones: any[];
        respuestasVerdaderoFalso: any[];
    }>;
    eliminarRespuesta(id: number): Promise<void>;
}
