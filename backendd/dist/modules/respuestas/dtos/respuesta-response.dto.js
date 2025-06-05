"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestaResponseDto = exports.RespuestaOpcionResponseDto = exports.RespuestaAbiertaResponseDto = void 0;
class RespuestaAbiertaResponseDto {
    id;
    preguntaId;
    preguntaTexto;
    texto;
}
exports.RespuestaAbiertaResponseDto = RespuestaAbiertaResponseDto;
class RespuestaOpcionResponseDto {
    id;
    opcionId;
    opcionTexto;
    preguntaId;
    preguntaTexto;
}
exports.RespuestaOpcionResponseDto = RespuestaOpcionResponseDto;
class RespuestaResponseDto {
    id;
    encuestaId;
    fechaCreacion;
    respuestasAbiertas;
    respuestasOpciones;
}
exports.RespuestaResponseDto = RespuestaResponseDto;
//# sourceMappingURL=respuesta-response.dto.js.map