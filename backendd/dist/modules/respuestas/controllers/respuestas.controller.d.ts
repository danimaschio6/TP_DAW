import { RespuestasService } from "../services/respuestas.service";
import { CreateRespuestaDTO } from "../dtos/create-respuesta.dto";
export declare class RespuestaController {
    private respuestasService;
    constructor(respuestasService: RespuestasService);
    crearRespuesta(dto: CreateRespuestaDTO): Promise<{
        id: number;
    }>;
}
