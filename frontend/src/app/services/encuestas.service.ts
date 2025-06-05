import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CreateEncuestaDTO } from "../interfaces/create-encuesta.dto";
import { Observable } from "rxjs";
import { CodigoTipoEnum } from "../enums/codigo-tipo.enum";
import { EncuestaDTO } from "../interfaces/encuesta.dto";
import { CrearRespuestaDTO } from "../interfaces/crear-respuesta.dto";
import { RespuestaDTO } from "../interfaces/respuesta.dto";
import { EstadisticasEncuestaDTO } from "../interfaces/estadisticas-encuesta.dto";

@Injectable({providedIn: 'root'})
export class EncuestasService{
    private httpClient = inject(HttpClient);

    // ========== MÉTODOS EXISTENTES ==========
    crearEncuesta(dto: CreateEncuestaDTO): Observable<{
        id: number;
        codigoRespuesta: string;
        codigoResultados: string;
     }>{
        return this.httpClient.post<{
            id:number;
            codigoRespuesta: string;
            codigoResultados: string;
        }>('/api/v1/encuestas', dto);
    }

    traerEncuesta(
        idEncuesta: number,
        codigo: string,
        tipo: CodigoTipoEnum,
    ):Observable<EncuestaDTO>{
        return this.httpClient.get<EncuestaDTO>(
            '/api/v1/encuestas/' + idEncuesta + '?codigo=' + codigo + '&tipo=' + tipo
        );
    }

    // ========== NUEVOS MÉTODOS PARA RESPUESTAS ==========
    
    /**
     * Crear una nueva respuesta a una encuesta
     */
    crearRespuesta(dto: CrearRespuestaDTO): Observable<RespuestaDTO> {
        return this.httpClient.post<RespuestaDTO>('/api/v1/respuestas', dto);
    }

    /**
     * Obtener una respuesta específica por ID
     */
    obtenerRespuesta(idRespuesta: number): Observable<RespuestaDTO> {
        return this.httpClient.get<RespuestaDTO>(`/api/v1/respuestas/${idRespuesta}`);
    }

    /**
     * Obtener todas las respuestas de una encuesta
     */
    obtenerRespuestasPorEncuesta(idEncuesta: number): Observable<RespuestaDTO[]> {
        return this.httpClient.get<RespuestaDTO[]>(`/api/v1/respuestas/encuesta/${idEncuesta}`);
    }

    /**
     * Obtener estadísticas de una encuesta
     */
    obtenerEstadisticasEncuesta(idEncuesta: number): Observable<EstadisticasEncuestaDTO> {
        return this.httpClient.get<EstadisticasEncuestaDTO>(`/api/v1/respuestas/encuesta/${idEncuesta}/estadisticas`);
    }

    /**
     * Eliminar una respuesta (para testing o administración)
     */
    eliminarRespuesta(idRespuesta: number): Observable<void> {
        return this.httpClient.delete<void>(`/api/v1/respuestas/${idRespuesta}`);
    }

    // ========== MÉTODO DE TESTING EXISTENTE ==========
    test(){
        this.traerEncuesta(1,'codigo-test', CodigoTipoEnum.RESPUESTA).subscribe({
            next:(res)=> console.log(res),
            error: (err)=> console.log(err),
        })
    }
}