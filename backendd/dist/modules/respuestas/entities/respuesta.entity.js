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
exports.Respuesta = void 0;
const typeorm_1 = require("typeorm");
const encuestas_entity_1 = require("../../encuestas/entities/encuestas.entity");
const respuesta_abierta_entity_1 = require("./respuesta-abierta.entity");
const respuesta_opcion_entity_1 = require("./respuesta-opcion.entity");
const respuesta_verdadero_falso_entity_1 = require("./respuesta-verdadero-falso.entity");
let Respuesta = class Respuesta {
    id;
    encuesta;
    fechaCreacion;
    respuestasAbiertas;
    respuestasOpciones;
    respuestasVerdaderoFalso;
};
exports.Respuesta = Respuesta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Respuesta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => encuestas_entity_1.Encuesta, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_encuesta' }),
    __metadata("design:type", encuestas_entity_1.Encuesta)
], Respuesta.prototype, "encuesta", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion' }),
    __metadata("design:type", Date)
], Respuesta.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => respuesta_abierta_entity_1.RespuestaAbierta, respuestaAbierta => respuestaAbierta.respuesta, { cascade: true }),
    __metadata("design:type", Array)
], Respuesta.prototype, "respuestasAbiertas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => respuesta_opcion_entity_1.RespuestaOpcion, respuestaOpcion => respuestaOpcion.respuesta, { cascade: true }),
    __metadata("design:type", Array)
], Respuesta.prototype, "respuestasOpciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => respuesta_verdadero_falso_entity_1.RespuestaVerdaderoFalso, respuestaVerdaderoFalso => respuestaVerdaderoFalso.respuesta, { cascade: true }),
    __metadata("design:type", Array)
], Respuesta.prototype, "respuestasVerdaderoFalso", void 0);
exports.Respuesta = Respuesta = __decorate([
    (0, typeorm_1.Entity)('respuestas')
], Respuesta);
//# sourceMappingURL=respuesta.entity.js.map