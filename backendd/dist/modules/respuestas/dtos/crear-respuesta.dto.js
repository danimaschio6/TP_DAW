"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearRespuestaDto = exports.RespuestaVerdaderoFalsoDto = exports.RespuestaOpcionDto = exports.RespuestaAbiertaDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RespuestaAbiertaDto {
    preguntaId;
    texto;
}
exports.RespuestaAbiertaDto = RespuestaAbiertaDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], RespuestaAbiertaDto.prototype, "preguntaId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RespuestaAbiertaDto.prototype, "texto", void 0);
class RespuestaOpcionDto {
    opcionId;
}
exports.RespuestaOpcionDto = RespuestaOpcionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], RespuestaOpcionDto.prototype, "opcionId", void 0);
class RespuestaVerdaderoFalsoDto {
    preguntaId;
    valorRespuesta;
}
exports.RespuestaVerdaderoFalsoDto = RespuestaVerdaderoFalsoDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], RespuestaVerdaderoFalsoDto.prototype, "preguntaId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], RespuestaVerdaderoFalsoDto.prototype, "valorRespuesta", void 0);
class CrearRespuestaDto {
    encuestaId;
    respuestasAbiertas;
    respuestasOpciones;
    respuestasVerdaderoFalso;
}
exports.CrearRespuestaDto = CrearRespuestaDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CrearRespuestaDto.prototype, "encuestaId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RespuestaAbiertaDto),
    __metadata("design:type", Array)
], CrearRespuestaDto.prototype, "respuestasAbiertas", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RespuestaOpcionDto),
    __metadata("design:type", Array)
], CrearRespuestaDto.prototype, "respuestasOpciones", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RespuestaVerdaderoFalsoDto),
    __metadata("design:type", Array)
], CrearRespuestaDto.prototype, "respuestasVerdaderoFalso", void 0);
//# sourceMappingURL=crear-respuesta.dto.js.map