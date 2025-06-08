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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestaController = void 0;
const common_1 = require("@nestjs/common");
const respuestas_service_1 = require("../services/respuestas.service");
const create_respuesta_dto_1 = require("../dtos/create-respuesta.dto");
let RespuestaController = class RespuestaController {
    respuestasService;
    constructor(respuestasService) {
        this.respuestasService = respuestasService;
    }
    async crearRespuesta(dto) {
        return await this.respuestasService.crearRespuesta(dto);
    }
};
exports.RespuestaController = RespuestaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_respuesta_dto_1.CreateRespuestaDTO]),
    __metadata("design:returntype", Promise)
], RespuestaController.prototype, "crearRespuesta", null);
exports.RespuestaController = RespuestaController = __decorate([
    (0, common_1.Controller)("/respuestas"),
    __metadata("design:paramtypes", [respuestas_service_1.RespuestasService])
], RespuestaController);
//# sourceMappingURL=respuestas.controller.js.map