import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { CrearRespuestaPayloadDTO } from '../interfaces/crear-respuesta-payload.dto';


@Injectable({providedIn: 'root'})
export class RespuestasService {
    private httpClient = inject(HttpClient);

    
    /**
     * Crea una nueva respuesta
     * POST /api/v1/respuestas
     */
    crearRespuesta(dto: CrearRespuestaPayloadDTO): Observable<any> {
        return this.httpClient.post<any>('/api/v1/respuestas', dto);
    }

    /**
     * Obtiene una respuesta específica
     * GET /api/v1/respuestas/:id
     */
    obtenerRespuesta(id: number): Observable<any> {
        return this.httpClient.get<any>(`/api/v1/respuestas/${id}`);
    }

    /**
     * Obtiene todas las respuestas de una encuesta
     * GET /api/v1/respuestas/encuesta/:encuestaId
     */
    obtenerRespuestasPorEncuesta(encuestaId: number): Observable<any[]> {
        return this.httpClient.get<any[]>(`/api/v1/respuestas/encuesta/${encuestaId}`);
    }

    obtenerTodasLasRespuestas(): Observable<CrearRespuestaPayloadDTO[]> { // <-- Nuevo método
        return this.httpClient.get<CrearRespuestaPayloadDTO[]>(`/api/v1/respuestas`);
    }

    /**
     * Obtiene estadísticas de una encuesta
     * GET /api/v1/respuestas/encuesta/:encuestaId/estadisticas
     */
    obtenerEstadisticasEncuesta(encuestaId: number): Observable<any> {
        return this.httpClient.get<any>(`/api/v1/respuestas/encuesta/${encuestaId}/estadisticas`);
    }

    /**
     * Elimina una respuesta (para testing/admin)
     * DELETE /api/v1/respuestas/:id
     */
    eliminarRespuesta(id: number): Observable<any> {
        return this.httpClient.delete<any>(`/api/v1/respuestas/${id}`);
    }
}