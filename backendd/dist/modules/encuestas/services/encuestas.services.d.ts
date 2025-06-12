import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';
import { Encuesta } from '../entities/encuestas.entity';
import { Repository } from 'typeorm';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { UpdateEncuestaEstadoDTO } from '../dtos/update-encuesta-estado.dto';
export declare class EncuestasService {
    private encuestasRepository;
    constructor(encuestasRepository: Repository<Encuesta>);
    crearEncuesta(dto: CreateEncuestaDTO): Promise<{
        id: number;
        codigoRespuesta: string;
        codigoResultados: string;
    }>;
    obtenerEncuesta(id: number, codigo: string, codigoTipo: CodigoTipoEnum.RESPUESTA | CodigoTipoEnum.RESULTADOS): Promise<Encuesta>;
    obtenerEncuestaPorCodigoRespuesta(codigo: string): Promise<Encuesta>;
    obtenerEncuestaPorCodigoResultados(codigo: string): Promise<Encuesta>;
    getAllEncuestas(): Promise<Encuesta[]>;
    obtenerTodasLasEncuestas(): Promise<Encuesta[]>;
    actualizarEstadoEncuesta(id: number, habilitada: boolean): Promise<Encuesta>;
    validarEncuestaParaResponder(codigoRespuesta: string): Promise<boolean>;
    updateEncuestaEstado(id: number, dto: UpdateEncuestaEstadoDTO): Promise<Encuesta>;
}
