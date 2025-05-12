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
exports.CreatePreguntaDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const tipos_respuesta_enum_1 = require("../enums/tipos-respuesta.enum");
const class_transformer_1 = require("class-transformer");
const create_opcion_dto_1 = require("./create.opcion.dto");
class CreatePreguntaDTO {
    numero;
    texto;
    tipo;
    opciones;
}
exports.CreatePreguntaDTO = CreatePreguntaDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePreguntaDTO.prototype, "numero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePreguntaDTO.prototype, "texto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: tipos_respuesta_enum_1.TiposRespuestaEnum }),
    (0, class_validator_1.IsEnum)(tipos_respuesta_enum_1.TiposRespuestaEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePreguntaDTO.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [create_opcion_dto_1.CreateOpcionDTO], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_opcion_dto_1.CreateOpcionDTO),
    __metadata("design:type", Array)
], CreatePreguntaDTO.prototype, "opciones", void 0);
//# sourceMappingURL=create.pregunta.dto.js.map