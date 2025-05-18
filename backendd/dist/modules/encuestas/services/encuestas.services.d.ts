import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';
import { Encuesta } from '../entities/encuestas.entity';
import { Repository } from 'typeorm';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
export declare class EncuestasService {
    private encuestasRepository;
    constructor(encuestasRepository: Repository<Encuesta>);
    crearEncuesta(dto: CreateEncuestaDTO): Promise<{
        id: number;
        codigoRespuesta: string;
        codigoResultados: string;
    }>;
    obtenerEncuesta(id: number, codigo: string, codigoTipo: CodigoTipoEnum.RESPUESTA | CodigoTipoEnum.RESULTADOS): Promise<Encuesta>;
}
