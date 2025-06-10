"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadisticasEncuestaDto = exports.EstadisticaRespuestaOpcionDto = exports.EstadisticaRespuestaAbiertaDto = void 0;
class EstadisticaRespuestaAbiertaDto {
    preguntaId;
    pregunta;
    totalRespuestas;
}
exports.EstadisticaRespuestaAbiertaDto = EstadisticaRespuestaAbiertaDto;
class EstadisticaRespuestaOpcionDto {
    preguntaId;
    pregunta;
    opcionId;
    opcion;
    votos;
}
exports.EstadisticaRespuestaOpcionDto = EstadisticaRespuestaOpcionDto;
class EstadisticasEncuestaDto {
    totalRespuestas;
    respuestasAbiertas;
    respuestasOpciones;
}
exports.EstadisticasEncuestaDto = EstadisticasEncuestaDto;
//# sourceMappingURL=estadisticas-response.dto.js.map