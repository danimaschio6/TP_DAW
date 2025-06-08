import { Repository } from 'typeorm';
import { CreateRespuestaDTO } from '../dtos/create-respuesta.dto';
import { Respuesta } from '../entities/respuesta.entity';
export declare class RespuestasService {
    private respuestasRepository;
    constructor(respuestasRepository: Repository<Respuesta>);
    crearRespuesta(dto: CreateRespuestaDTO): Promise<{
        id: number;
    }>;
}
