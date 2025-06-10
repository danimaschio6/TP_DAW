import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CreateEncuestaDTO } from "../interfaces/create-encuesta.dto";
import { Observable } from "rxjs";
import { CodigoTipoEnum } from "../enums/codigo-tipo.enum";
import { EncuestaDTO } from "../interfaces/encuesta.dto";

@Injectable({providedIn: 'root'})
export class EncuestasService {
    private httpClient = inject(HttpClient);
    
    crearEncuesta(dto: CreateEncuestaDTO): Observable<{
        id: number;
        codigoRespuesta: string;
        codigoResultados: string;
    }> {
        return this.httpClient.post<{
            id: number;
            codigoRespuesta: string;
            codigoResultados: string;
        }>('/api/v1/encuestas', dto);
    }
    
    traerEncuesta(
        idEncuesta: number,
        codigo: string,
        tipo: CodigoTipoEnum,
    ): Observable<EncuestaDTO> {
        return this.httpClient.get<EncuestaDTO>(
            `/api/v1/encuestas/${idEncuesta}?codigo=${codigo}&tipo=${tipo}`
        );
    }

    // 🔧 NUEVOS MÉTODOS - Adaptados a tu backend existente
    
    /**
     * Obtiene una encuesta por su código de respuesta
     * Usa el endpoint existente pero busca primero por código
     */
    obtenerEncuestaPorCodigoRespuesta(codigo: string): Observable<EncuestaDTO> {
        // Opción 1: Si agregas endpoint específico al backend (RECOMENDADO)
        return this.httpClient.get<EncuestaDTO>(`/api/v1/encuestas/respuesta/${codigo}`);
        
        // Opción 2: Si no puedes modificar el backend, necesitarías una consulta diferente
        // return this.httpClient.get<EncuestaDTO>(`/api/v1/encuestas/por-codigo?codigo=${codigo}&tipo=RESPUESTA`);
    }


    obtenerEncuestaPorCodigoResultados(codigo: string): Observable<EncuestaDTO> {
        return this.httpClient.get<EncuestaDTO>(`/api/v1/encuestas/resultados/${codigo}`);
       
    }


    obtenerEncuestaPorCodigo(codigo: string, tipo: CodigoTipoEnum = CodigoTipoEnum.RESPUESTA): Observable<EncuestaDTO> {
        const tipoStr = tipo === CodigoTipoEnum.RESPUESTA ? 'respuesta' : 'resultados';
        return this.httpClient.get<EncuestaDTO>(`/api/v1/encuestas/${tipoStr}/${codigo}`);
    }


     obtenerEncuestaConCodigo(idEncuesta: number, codigo: string): Observable<EncuestaDTO> {
        return this.traerEncuesta(idEncuesta, codigo, CodigoTipoEnum.RESULTADOS);
    }

    /**
     * ✅ MÉTODO DE EMERGENCIA - Para probar si el problema es la obtención de la encuesta
     * Simula obtener una encuesta directamente por ID (para testing)
     */
    obtenerEncuestaPorId(id: number): Observable<EncuestaDTO> {
        return this.httpClient.get<EncuestaDTO>(`/api/v1/encuestas/${id}`);
    }

    
    test() {
        this.traerEncuesta(1, 'codigo-test', CodigoTipoEnum.RESPUESTA).subscribe({
            next: (res) => console.log(res),
            error: (err) => console.log(err),
        });
    }
}