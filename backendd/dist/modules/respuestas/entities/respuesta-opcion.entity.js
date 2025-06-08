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
exports.RespuestaOpcion = void 0;
const typeorm_1 = require("typeorm");
const respuesta_entity_1 = require("./respuesta.entity");
const opcion_entity_1 = require("../../encuestas/entities/opcion.entity");
const class_transformer_1 = require("class-transformer");
let RespuestaOpcion = class RespuestaOpcion {
    id;
    opcion;
    respuesta;
};
exports.RespuestaOpcion = RespuestaOpcion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RespuestaOpcion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => opcion_entity_1.Opcion),
    (0, typeorm_1.JoinColumn)({ name: 'id_opcion' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", opcion_entity_1.Opcion)
], RespuestaOpcion.prototype, "opcion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => respuesta_entity_1.Respuesta),
    (0, typeorm_1.JoinColumn)({ name: 'id_respuesta' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", respuesta_entity_1.Respuesta)
], RespuestaOpcion.prototype, "respuesta", void 0);
exports.RespuestaOpcion = RespuestaOpcion = __decorate([
    (0, typeorm_1.Entity)('respuestas_opciones')
], RespuestaOpcion);
//# sourceMappingURL=respuesta-opcion.entity.js.map