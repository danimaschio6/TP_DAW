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
exports.Pregunta = void 0;
const typeorm_1 = require("typeorm");
const encuestas_entity_1 = require("./encuestas.entity");
const class_transformer_1 = require("class-transformer");
const opcion_entity_1 = require("./opcion.entity");
const tipos_respuesta_enum_1 = require("../enums/tipos-respuesta.enum");
const respuesta_abierta_entity_1 = require("../../respuestas/entities/respuesta-abierta.entity");
let Pregunta = class Pregunta {
    id;
    numero;
    texto;
    tipo;
    encuesta;
    opciones;
    respuestasAbiertas;
};
exports.Pregunta = Pregunta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pregunta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pregunta.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pregunta.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: tipos_respuesta_enum_1.TiposRespuestaEnum }),
    __metadata("design:type", String)
], Pregunta.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => encuestas_entity_1.Encuesta),
    (0, typeorm_1.JoinColumn)({ name: 'id_encuesta' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", encuestas_entity_1.Encuesta)
], Pregunta.prototype, "encuesta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => opcion_entity_1.Opcion, (opcion) => opcion.pregunta, {
        cascade: ['insert']
    }),
    __metadata("design:type", Array)
], Pregunta.prototype, "opciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => respuesta_abierta_entity_1.RespuestaAbierta, (respuestaAbierta) => respuestaAbierta.pregunta, {
        cascade: ['insert']
    }),
    __metadata("design:type", Array)
], Pregunta.prototype, "respuestasAbiertas", void 0);
exports.Pregunta = Pregunta = __decorate([
    (0, typeorm_1.Entity)({ name: 'preguntas' })
], Pregunta);
//# sourceMappingURL=pregunta.entity.js.map