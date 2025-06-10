"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const respuesta_entity_1 = require("./entities/respuesta.entity");
const respuesta_abierta_entity_1 = require("./entities/respuesta-abierta.entity");
const respuesta_opcion_entity_1 = require("./entities/respuesta-opcion.entity");
const respuestas_service_1 = require("./services/respuestas.service");
const respuesta_controller_1 = require("./controllers/respuesta.controller");
let RespuestasModule = class RespuestasModule {
};
exports.RespuestasModule = RespuestasModule;
exports.RespuestasModule = RespuestasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                respuesta_entity_1.Respuesta,
                respuesta_abierta_entity_1.RespuestaAbierta,
                respuesta_opcion_entity_1.RespuestaOpcion
            ])
        ],
        controllers: [respuesta_controller_1.RespuestasController],
        providers: [respuestas_service_1.RespuestasService],
        exports: [respuestas_service_1.RespuestasService],
    })
], RespuestasModule);
//# sourceMappingURL=respuestas.module.js.map