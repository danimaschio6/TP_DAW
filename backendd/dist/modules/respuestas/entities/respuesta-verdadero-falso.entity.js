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
exports.RespuestaVerdaderoFalso = void 0;
const typeorm_1 = require("typeorm");
const respuesta_entity_1 = require("./respuesta.entity");
const opcion_entity_1 = require("../../encuestas/entities/opcion.entity");
let RespuestaVerdaderoFalso = class RespuestaVerdaderoFalso {
    id;
    respuesta;
    opcion;
};
exports.RespuestaVerdaderoFalso = RespuestaVerdaderoFalso;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RespuestaVerdaderoFalso.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => respuesta_entity_1.Respuesta, {
        nullable: false,
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id_respuesta' }),
    __metadata("design:type", respuesta_entity_1.Respuesta)
], RespuestaVerdaderoFalso.prototype, "respuesta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => opcion_entity_1.Opcion, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_opcion' }),
    __metadata("design:type", opcion_entity_1.Opcion)
], RespuestaVerdaderoFalso.prototype, "opcion", void 0);
exports.RespuestaVerdaderoFalso = RespuestaVerdaderoFalso = __decorate([
    (0, typeorm_1.Entity)('respuestas_verdadero_falso')
], RespuestaVerdaderoFalso);
//# sourceMappingURL=respuesta-verdadero-falso.entity.js.map