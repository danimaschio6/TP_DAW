// src/app/services/respuestas.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearRespuestaDTO } from '../interfaces/crear-respuesta.dto';
import { RespuestaDTO } from '../interfaces/respuesta.dto';
import { EstadisticasEncuestaDTO } from '../interfaces/estadisticas-encuesta.dto';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {
  private readonly API_URL = 'http://localhost:3000/api/v1/respuestas';
  
  private http = inject(HttpClient);

  /**
   * Crear una nueva respuesta a una encuesta
   */
  crearRespuesta(respuesta: CrearRespuestaDTO): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(this.API_URL, respuesta);
  }

  /**
   * Obtener una respuesta específica por ID
   */
  obtenerRespuesta(id: number): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_URL}/${id}`);
  }

  /**
   * Obtener todas las respuestas de una encuesta
   */
  obtenerRespuestasPorEncuesta(encuestaId: number): Observable<RespuestaDTO[]> {
    return this.http.get<RespuestaDTO[]>(`${this.API_URL}/encuesta/${encuestaId}`);
  }

  /**
   * Obtener estadísticas de una encuesta
   */
  obtenerEstadisticasEncuesta(encuestaId: number): Observable<EstadisticasEncuestaDTO> {
    return this.http.get<EstadisticasEncuestaDTO>(`${this.API_URL}/encuesta/${encuestaId}/estadisticas`);
  }

  /**
   * Eliminar una respuesta (para testing/admin)
   */
  eliminarRespuesta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}