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

    getAllEncuestas(): Observable<EncuestaDTO[]> {
     return this.httpClient.get<EncuestaDTO[]>('/api/v1/encuestas');
    }
    
    // Método para actualizar el estado de una encuesta
    updateEncuestaEstado(encuestaId: number, habilitada: boolean): Observable<EncuestaDTO> {
        return this.httpClient.patch<EncuestaDTO>(`/api/v1/encuestas/${encuestaId}/estado`, { habilitada });
    }

    obtenerEncuestaPorCodigoRespuesta(codigo: string): Observable<EncuestaDTO> {
        return this.httpClient.get<EncuestaDTO>(`/api/v1/encuestas/respuesta/${codigo}`);
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
