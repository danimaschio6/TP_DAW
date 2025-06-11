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
exports.EncuestaController = void 0;
const common_1 = require("@nestjs/common");
const encuestas_services_1 = require("../services/encuestas.services");
const create_encuesta_dto_1 = require("../dtos/create-encuesta.dto");
const obtener_encuesta_dto_1 = require("../dtos/obtener-encuesta.dto");
const common_2 = require("@nestjs/common");
let EncuestaController = class EncuestaController {
    encuestasService;
    constructor(encuestasService) {
        this.encuestasService = encuestasService;
    }
    async crearEncuesta(dto) {
        return await this.encuestasService.crearEncuesta(dto);
    }
    async obtenerTodasLasEncuestas() {
        return await this.encuestasService.obtenerTodasLasEncuestas();
    }
    async obtenerEncuesta(id, dto) {
        return await this.encuestasService.obtenerEncuesta(id, dto.codigo, dto.tipo);
    }
    async obtenerEncuestaPorCodigoRespuesta(codigo) {
        return await this.encuestasService.obtenerEncuestaPorCodigoRespuesta(codigo);
    }
    async obtenerEncuestaPorCodigoResultados(codigo) {
        return await this.encuestasService.obtenerEncuestaPorCodigoResultados(codigo);
    }
    async actualizarEstadoEncuesta(id, body) {
        return await this.encuestasService.actualizarEstadoEncuesta(id, body.habilitada);
    }
    async validarEncuestaParaResponder(codigo) {
        try {
            await this.encuestasService.validarEncuestaParaResponder(codigo);
            return { valida: true };
        }
        catch (error) {
            return {
                valida: false,
                mensaje: error.message || 'La encuesta no está disponible'
            };
        }
    }
};
exports.EncuestaController = EncuestaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_encuesta_dto_1.CreateEncuestaDTO]),
    __metadata("design:returntype", Promise)
], EncuestaController.prototype, "crearEncuesta", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EncuestaController.prototype, "obtenerTodasLasEncuestas", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, obtener_encuesta_dto_1.ObtenerEncuestaDto]),
    __metadata("design:returntype", Promise)
], EncuestaController.prototype, "obtenerEncuesta", null);
__decorate([
    (0, common_1.Get)('respuesta/:codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EncuestaController.prototype, "obtenerEncuestaPorCodigoRespuesta", null);
__decorate([
    (0, common_1.Get)('resultados/:codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EncuestaController.prototype, "obtenerEncuestaPorCodigoResultados", null);
__decorate([
    (0, common_2.Patch)(':id/estado'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EncuestaController.prototype, "actualizarEstadoEncuesta", null);
__decorate([
    (0, common_1.Get)('validar/:codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EncuestaController.prototype, "validarEncuestaParaResponder", null);
exports.EncuestaController = EncuestaController = __decorate([
    (0, common_1.Controller)("/encuestas"),
    __metadata("design:paramtypes", [encuestas_services_1.EncuestasService])
], EncuestaController);
//# sourceMappingURL=encuestas.controllers.js.map