"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestaResponseDto = exports.RespuestaVerdaderoFalsoDto = exports.RespuestaOpcionResponseDto = exports.RespuestaAbiertaResponseDto = void 0;
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
class RespuestaVerdaderoFalsoDto {
    id;
    preguntaId;
    preguntaTexto;
    valorRespuesta;
}
exports.RespuestaVerdaderoFalsoDto = RespuestaVerdaderoFalsoDto;
class RespuestaResponseDto {
    id;
    encuestaId;
    fechaCreacion;
    respuestasAbiertas;
    respuestasOpciones;
    respuestasVerdaderoFalso;
}
exports.RespuestaResponseDto = RespuestaResponseDto;
//# sourceMappingURL=respuesta-response.dto.js.map