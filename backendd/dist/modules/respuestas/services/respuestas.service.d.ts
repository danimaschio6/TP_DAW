import { Repository } from 'typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { RespuestaAbierta } from '../entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../entities/respuesta-opcion.entity';
import { Encuesta } from '../../encuestas/entities/encuestas.entity';
export declare class RespuestasService {
    private respuestaRepository;
    private respuestaAbiertaRepository;
    private respuestaOpcionRepository;
    private encuestaRepository;
    constructor(respuestaRepository: Repository<Respuesta>, respuestaAbiertaRepository: Repository<RespuestaAbierta>, respuestaOpcionRepository: Repository<RespuestaOpcion>, encuestaRepository: Repository<Encuesta>);
    crearRespuesta(encuestaId: number, respuestasData: any): Promise<Respuesta>;
    obtenerTodasLasRespuestas(): Promise<Respuesta[]>;
    obtenerRespuestaCompleta(respuestaId: number): Promise<Respuesta>;
    obtenerRespuestasPorEncuesta(encuestaId: number): Promise<Respuesta[]>;
    obtenerEstadisticasEncuesta(encuestaId: number): Promise<{
        totalRespuestas: number;
        respuestasAbiertas: any[];
        respuestasOpciones: any[];
    }>;
    eliminarRespuesta(respuestaId: number): Promise<{
        message: string;
    }>;
}
