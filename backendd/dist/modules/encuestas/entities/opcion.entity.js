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
exports.Opcion = void 0;
const typeorm_1 = require("typeorm");
const pregunta_entity_1 = require("./pregunta.entity");
const class_transformer_1 = require("class-transformer");
const respuesta_opcion_entity_1 = require("../../respuestas/entities/respuesta-opcion.entity");
let Opcion = class Opcion {
    id;
    texto;
    numero;
    pregunta;
    respuestasOpciones;
};
exports.Opcion = Opcion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Opcion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Opcion.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Opcion.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pregunta_entity_1.Pregunta),
    (0, typeorm_1.JoinColumn)({ name: 'id_pregunta' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", pregunta_entity_1.Pregunta)
], Opcion.prototype, "pregunta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => respuesta_opcion_entity_1.RespuestaOpcion, (respuestaOpcion) => respuestaOpcion.opcion, {
        cascade: ['insert'],
    }),
    __metadata("design:type", Array)
], Opcion.prototype, "respuestasOpciones", void 0);
exports.Opcion = Opcion = __decorate([
    (0, typeorm_1.Entity)({ name: 'opciones' })
], Opcion);
//# sourceMappingURL=opcion.entity.js.map