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
exports.RespuestasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const respuesta_entity_1 = require("../entities/respuesta.entity");
const respuesta_abierta_entity_1 = require("../entities/respuesta-abierta.entity");
const respuesta_opcion_entity_1 = require("../entities/respuesta-opcion.entity");
let RespuestasService = class RespuestasService {
    respuestaRepository;
    respuestaAbiertaRepository;
    respuestaOpcionRepository;
    constructor(respuestaRepository, respuestaAbiertaRepository, respuestaOpcionRepository) {
        this.respuestaRepository = respuestaRepository;
        this.respuestaAbiertaRepository = respuestaAbiertaRepository;
        this.respuestaOpcionRepository = respuestaOpcionRepository;
    }
    async crearRespuesta(encuestaId, respuestasData) {
        const respuesta = this.respuestaRepository.create({
            encuesta: { id: encuestaId }
        });
        const respuestaGuardada = await this.respuestaRepository.save(respuesta);
        if (respuestasData.respuestasAbiertas && respuestasData.respuestasAbiertas.length > 0) {
            const respuestasAbiertas = respuestasData.respuestasAbiertas.map(ra => this.respuestaAbiertaRepository.create({
                respuesta: respuestaGuardada,
                pregunta: { id: ra.preguntaId },
                texto: ra.texto
            }));
            await this.respuestaAbiertaRepository.save(respuestasAbiertas);
        }
        if (respuestasData.respuestasOpciones && respuestasData.respuestasOpciones.length > 0) {
            const respuestasOpciones = respuestasData.respuestasOpciones.map(ro => this.respuestaOpcionRepository.create({
                respuesta: respuestaGuardada,
                opcion: { id: ro.opcionId }
            }));
            await this.respuestaOpcionRepository.save(respuestasOpciones);
        }
        return this.obtenerRespuestaCompleta(respuestaGuardada.id);
    }
    async obtenerTodasLasRespuestas() {
        return await this.respuestaRepository.find({
            relations: [
                'encuesta',
                'respuestasAbiertas',
                'respuestasAbiertas.pregunta',
                'respuestasOpciones',
                'respuestasOpciones.opcion',
                'respuestasOpciones.opcion.pregunta'
            ],
            order: { fechaCreacion: 'DESC' }
        });
    }
    async obtenerRespuestaCompleta(respuestaId) {
        const respuesta = await this.respuestaRepository.findOne({
            where: { id: respuestaId },
            relations: [
                'encuesta',
                'respuestasAbiertas',
                'respuestasAbiertas.pregunta',
                'respuestasOpciones',
                'respuestasOpciones.opcion',
                'respuestasOpciones.opcion.pregunta'
            ]
        });
        if (!respuesta) {
            throw new common_1.NotFoundException(`Respuesta con ID ${respuestaId} no encontrada`);
        }
        return respuesta;
    }
    async obtenerRespuestasPorEncuesta(encuestaId) {
        return await this.respuestaRepository.find({
            where: { encuesta: { id: encuestaId } },
            relations: [
                'respuestasAbiertas',
                'respuestasAbiertas.pregunta',
                'respuestasOpciones',
                'respuestasOpciones.opcion',
                'respuestasOpciones.opcion.pregunta'
            ],
            order: { fechaCreacion: 'DESC' }
        });
    }
    async obtenerEstadisticasEncuesta(encuestaId) {
        const totalRespuestas = await this.respuestaRepository.count({
            where: { encuesta: { id: encuestaId } }
        });
        const respuestasAbiertas = await this.respuestaAbiertaRepository
            .createQueryBuilder('ra')
            .innerJoin('ra.respuesta', 'r')
            .innerJoin('ra.pregunta', 'p')
            .where('r.id_encuesta = :encuestaId', { encuestaId })
            .select(['p.id as pregunta_id', 'p.texto as pregunta', 'COUNT(*) as total_respuestas'])
            .groupBy('p.id, p.texto')
            .getRawMany();
        const respuestasOpciones = await this.respuestaOpcionRepository
            .createQueryBuilder('ro')
            .innerJoin('ro.respuesta', 'r')
            .innerJoin('ro.opcion', 'o')
            .innerJoin('o.pregunta', 'p')
            .where('r.id_encuesta = :encuestaId', { encuestaId })
            .select([
            'p.id as pregunta_id',
            'p.texto as pregunta',
            'o.id as opcion_id',
            'o.texto as opcion',
            'COUNT(*) as votos'
        ])
            .groupBy('p.id, p.texto, o.id, o.texto')
            .getRawMany();
        return {
            totalRespuestas,
            respuestasAbiertas,
            respuestasOpciones
        };
    }
    async eliminarRespuesta(respuestaId) {
        const respuesta = await this.respuestaRepository.findOne({
            where: { id: respuestaId }
        });
        if (!respuesta) {
            throw new common_1.NotFoundException(`Respuesta con ID ${respuestaId} no encontrada`);
        }
        await this.respuestaRepository.remove(respuesta);
        return { message: 'Respuesta eliminada correctamente' };
    }
};
exports.RespuestasService = RespuestasService;
exports.RespuestasService = RespuestasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(respuesta_entity_1.Respuesta)),
    __param(1, (0, typeorm_1.InjectRepository)(respuesta_abierta_entity_1.RespuestaAbierta)),
    __param(2, (0, typeorm_1.InjectRepository)(respuesta_opcion_entity_1.RespuestaOpcion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RespuestasService);
//# sourceMappingURL=respuestas.service.js.map