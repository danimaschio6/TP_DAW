import { Repository } from 'typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { RespuestaAbierta } from '../entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../entities/respuesta-opcion.entity';
export declare class RespuestasService {
    private respuestaRepository;
    private respuestaAbiertaRepository;
    private respuestaOpcionRepository;
    constructor(respuestaRepository: Repository<Respuesta>, respuestaAbiertaRepository: Repository<RespuestaAbierta>, respuestaOpcionRepository: Repository<RespuestaOpcion>);
    crearRespuesta(encuestaId: number, respuestasData: any): Promise<Respuesta>;
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
