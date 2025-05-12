"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncuestasModule = void 0;
const common_1 = require("@nestjs/common");
const encuestas_services_1 = require("./services/encuestas.services");
const typeorm_1 = require("@nestjs/typeorm");
const encuestas_entity_1 = require("./entities/encuestas.entity");
const pregunta_entity_1 = require("./entities/pregunta.entity");
const opcion_entity_1 = require("./entities/opcion.entity");
let EncuestasModule = class EncuestasModule {
};
exports.EncuestasModule = EncuestasModule;
exports.EncuestasModule = EncuestasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([encuestas_entity_1.Encuesta, pregunta_entity_1.Pregunta, opcion_entity_1.Opcion])],
        controllers: [EncuestasModule],
        providers: [encuestas_services_1.EncuestasService],
    })
], EncuestasModule);
//# sourceMappingURL=encuestas.module.js.map