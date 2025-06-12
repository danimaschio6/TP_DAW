import { Repository } from 'typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { RespuestaAbierta } from '../entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../entities/respuesta-opcion.entity';
import { RespuestaVerdaderoFalso } from '../entities/respuesta-verdadero-falso.entity';
import { Encuesta } from '../../encuestas/entities/encuestas.entity';
import { CreateRespuestaVerdaderoFalsoDto } from '../dtos/respuesta-verdadero-falso.dto';
export declare class RespuestasService {
    private respuestaRepository;
    private respuestaAbiertaRepository;
    private respuestaOpcionRepository;
    private respuestaVerdaderoFalsoRepository;
    private encuestaRepository;
    constructor(respuestaRepository: Repository<Respuesta>, respuestaAbiertaRepository: Repository<RespuestaAbierta>, respuestaOpcionRepository: Repository<RespuestaOpcion>, respuestaVerdaderoFalsoRepository: Repository<RespuestaVerdaderoFalso>, encuestaRepository: Repository<Encuesta>);
    crearRespuesta(encuestaId: number, respuestasData: any): Promise<Respuesta>;
    crearRespuestaVerdaderoFalso(respuestaId: number, dto: CreateRespuestaVerdaderoFalsoDto): Promise<RespuestaVerdaderoFalso>;
    obtenerTodasLasRespuestas(): Promise<Respuesta[]>;
    obtenerRespuestaCompleta(respuestaId: number): Promise<Respuesta>;
    obtenerRespuestasPorEncuesta(encuestaId: number): Promise<Respuesta[]>;
    obtenerEstadisticasEncuesta(encuestaId: number): Promise<{
        totalRespuestas: number;
        respuestasAbiertas: any[];
        respuestasOpciones: any[];
    }>;
    obtenerRespuestasVerdaderoFalso(respuestaId: number): Promise<RespuestaVerdaderoFalso[]>;
    eliminarRespuesta(respuestaId: number): Promise<{
        message: string;
    }>;
    eliminarRespuestaVerdaderoFalso(id: number): Promise<{
        message: string;
    }>;
}
