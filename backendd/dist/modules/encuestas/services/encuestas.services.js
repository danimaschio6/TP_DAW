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
exports.EncuestasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const encuestas_entity_1 = require("../entities/encuestas.entity");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const codigo_tipo_enum_1 = require("../enums/codigo-tipo.enum");
const common_2 = require("@nestjs/common");
let EncuestasService = class EncuestasService {
    encuestasRepository;
    constructor(encuestasRepository) {
        this.encuestasRepository = encuestasRepository;
    }
    async crearEncuesta(dto) {
        const encuesta = this.encuestasRepository.create({
            ...dto,
            codigoRespuesta: (0, uuid_1.v4)(),
            codigoResultados: (0, uuid_1.v4)(),
            fechaVencimiento: dto.fechaVencimiento ? new Date(dto.fechaVencimiento) : null,
        });
        const encuestaGuardada = await this.encuestasRepository.save(encuesta);
        return {
            id: encuestaGuardada.id,
            codigoRespuesta: encuestaGuardada.codigoRespuesta,
            codigoResultados: encuestaGuardada.codigoResultados
        };
    }
    async obtenerEncuesta(id, codigo, codigoTipo) {
        const query = this.encuestasRepository
            .createQueryBuilder('encuesta')
            .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
            .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
            .where('encuesta.id = :id', { id });
        switch (codigoTipo) {
            case codigo_tipo_enum_1.CodigoTipoEnum.RESPUESTA:
                query.andWhere('encuesta.codigoRespuesta = :codigo', { codigo });
                break;
            case codigo_tipo_enum_1.CodigoTipoEnum.RESULTADOS:
                query.andWhere('encuesta.codigoResultados = :codigo', { codigo });
                break;
        }
        query.orderBy('pregunta.numero', 'ASC');
        query.addOrderBy('preguntaOpcion.numero', 'ASC');
        const encuesta = await query.getOne();
        if (!encuesta) {
            throw new common_1.BadRequestException('Datos de encuesta no validos');
        }
        return encuesta;
    }
    async obtenerEncuestaPorCodigoRespuesta(codigo) {
        const encuesta = await this.encuestasRepository.findOne({
            where: { codigoRespuesta: codigo },
            relations: ['preguntas', 'preguntas.opciones']
        });
        if (!encuesta) {
            throw new common_2.NotFoundException('Encuesta no encontrada');
        }
        if (!encuesta.habilitada) {
            throw new common_1.ForbiddenException('Esta encuesta está deshabilitada y no puede ser respondida');
        }
        return encuesta;
    }
    async obtenerEncuestaPorCodigoResultados(codigo) {
        const encuesta = await this.encuestasRepository.findOne({
            where: { codigoResultados: codigo },
            relations: ['preguntas', 'preguntas.opciones']
        });
        if (!encuesta) {
            throw new common_2.NotFoundException('Encuesta no encontrada');
        }
        return encuesta;
    }
    async getAllEncuestas() {
        return await this.encuestasRepository.find({
            relations: ['preguntas', 'preguntas.opciones'],
        });
    }
    async obtenerTodasLasEncuestas() {
        return await this.encuestasRepository.find({
            order: {
                id: 'DESC'
            }
        });
    }
    async actualizarEstadoEncuesta(id, habilitada) {
        const encuesta = await this.encuestasRepository.findOne({
            where: { id }
        });
        if (!encuesta) {
            throw new common_2.NotFoundException('Encuesta no encontrada');
        }
        encuesta.habilitada = habilitada;
        return await this.encuestasRepository.save(encuesta);
    }
    async validarEncuestaParaResponder(codigoRespuesta) {
        const encuesta = await this.encuestasRepository.findOne({
            where: { codigoRespuesta: codigoRespuesta }
        });
        if (!encuesta) {
            throw new common_2.NotFoundException('Encuesta no encontrada');
        }
        if (!encuesta.habilitada) {
            throw new common_1.ForbiddenException('Esta encuesta está deshabilitada y no puede ser respondida');
        }
        return true;
    }
    async updateEncuestaEstado(id, dto) {
        const encuesta = await this.encuestasRepository.findOne({ where: { id } });
        if (!encuesta) {
            throw new common_2.NotFoundException('Encuesta no encontrada');
        }
        encuesta.habilitada = dto.habilitada;
        return this.encuestasRepository.save(encuesta);
    }
};
exports.EncuestasService = EncuestasService;
exports.EncuestasService = EncuestasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(encuestas_entity_1.Encuesta)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EncuestasService);
//# sourceMappingURL=encuestas.services.js.map