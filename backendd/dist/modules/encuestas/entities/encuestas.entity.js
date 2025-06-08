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
exports.Encuesta = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const pregunta_entity_1 = require("./pregunta.entity");
const respuesta_entity_1 = require("../../respuestas/entities/respuesta.entity");
let Encuesta = class Encuesta {
    id;
    nombre;
    preguntas;
    codigoRespuesta;
    codigoResultados;
    respuestas;
};
exports.Encuesta = Encuesta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Encuesta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre' }),
    __metadata("design:type", String)
], Encuesta.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pregunta_entity_1.Pregunta, (pregunta) => pregunta.encuesta, {
        cascade: ['insert'],
    }),
    __metadata("design:type", Array)
], Encuesta.prototype, "preguntas", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo_respuesta' }),
    __metadata("design:type", String)
], Encuesta.prototype, "codigoRespuesta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo_resultados' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Encuesta.prototype, "codigoResultados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => respuesta_entity_1.Respuesta, (respuesta) => respuesta.encuesta, {
        cascade: ['insert'],
    }),
    __metadata("design:type", Array)
], Encuesta.prototype, "respuestas", void 0);
exports.Encuesta = Encuesta = __decorate([
    (0, typeorm_1.Entity)({ name: "encuestas" })
], Encuesta);
//# sourceMappingURL=encuestas.entity.js.map