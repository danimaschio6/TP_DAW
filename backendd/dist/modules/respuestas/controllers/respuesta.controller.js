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
exports.RespuestasController = void 0;
const common_1 = require("@nestjs/common");
const respuestas_service_1 = require("../services/respuestas.service");
const crear_respuesta_dto_1 = require("../dtos/crear-respuesta.dto");
let RespuestasController = class RespuestasController {
    respuestasService;
    constructor(respuestasService) {
        this.respuestasService = respuestasService;
    }
    async crearRespuesta(crearRespuestaDto) {
        const { encuestaId, ...respuestasData } = crearRespuestaDto;
        return await this.respuestasService.crearRespuesta(encuestaId, respuestasData);
    }
    async obtenerRespuesta(id) {
        return await this.respuestasService.obtenerRespuestaCompleta(id);
    }
    async obtenerRespuestasPorEncuesta(encuestaId) {
        return await this.respuestasService.obtenerRespuestasPorEncuesta(encuestaId);
    }
    async obtenerEstadisticasEncuesta(encuestaId) {
        return await this.respuestasService.obtenerEstadisticasEncuesta(encuestaId);
    }
    async eliminarRespuesta(id) {
        await this.respuestasService.eliminarRespuesta(id);
    }
};
exports.RespuestasController = RespuestasController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_respuesta_dto_1.CrearRespuestaDto]),
    __metadata("design:returntype", Promise)
], RespuestasController.prototype, "crearRespuesta", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RespuestasController.prototype, "obtenerRespuesta", null);
__decorate([
    (0, common_1.Get)('encuesta/:encuestaId'),
    __param(0, (0, common_1.Param)('encuestaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RespuestasController.prototype, "obtenerRespuestasPorEncuesta", null);
__decorate([
    (0, common_1.Get)('encuesta/:encuestaId/estadisticas'),
    __param(0, (0, common_1.Param)('encuestaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RespuestasController.prototype, "obtenerEstadisticasEncuesta", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RespuestasController.prototype, "eliminarRespuesta", null);
exports.RespuestasController = RespuestasController = __decorate([
    (0, common_1.Controller)('respuestas'),
    __metadata("design:paramtypes", [respuestas_service_1.RespuestasService])
], RespuestasController);
//# sourceMappingURL=respuesta.controller.js.map