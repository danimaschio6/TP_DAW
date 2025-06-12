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
const respuesta_verdadero_falso_entity_1 = require("../entities/respuesta-verdadero-falso.entity");
const encuestas_entity_1 = require("../../encuestas/entities/encuestas.entity");
let RespuestasService = class RespuestasService {
    respuestaRepository;
    respuestaAbiertaRepository;
    respuestaOpcionRepository;
    respuestaVerdaderoFalsoRepository;
    encuestaRepository;
    constructor(respuestaRepository, respuestaAbiertaRepository, respuestaOpcionRepository, respuestaVerdaderoFalsoRepository, encuestaRepository) {
        this.respuestaRepository = respuestaRepository;
        this.respuestaAbiertaRepository = respuestaAbiertaRepository;
        this.respuestaOpcionRepository = respuestaOpcionRepository;
        this.respuestaVerdaderoFalsoRepository = respuestaVerdaderoFalsoRepository;
        this.encuestaRepository = encuestaRepository;
    }
    async crearRespuesta(encuestaId, respuestasData) {
        const encuesta = await this.encuestaRepository.findOne({ where: { id: encuestaId } });
        if (!encuesta) {
            throw new common_1.NotFoundException('Encuesta no encontrada');
        }
        if (encuesta.fechaVencimiento && new Date() > encuesta.fechaVencimiento) {
            throw new common_1.BadRequestException('La encuesta ya ha vencido y no se puede responder');
        }
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
        if (respuestasData.respuestasVerdaderoFalso && respuestasData.respuestasVerdaderoFalso.length > 0) {
            const respuestasVerdaderoFalso = respuestasData.respuestasVerdaderoFalso.map(rVF => this.respuestaVerdaderoFalsoRepository.create({
                respuesta: respuestaGuardada,
                pregunta: { id: rVF.preguntaId },
                valorRespuesta: rVF.valorRespuesta
            }));
            await this.respuestaVerdaderoFalsoRepository.save(respuestasVerdaderoFalso);
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
                'respuestasOpciones.opcion.pregunta',
                'respuestasVerdaderoFalso',
                'respuestasVerdaderoFalso.pregunta',
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
        const respuestasVerdaderoFalso = await this.respuestaAbiertaRepository
            .createQueryBuilder('rVF')
            .innerJoin('rVF.respuesta', 'r')
            .innerJoin('rVF.pregunta', 'p')
            .where('r.id_encuesta = :encuestaId', { encuestaId })
            .select(['p.id as pregunta_id', 'p.texto as pregunta', 'COUNT(*) as total_respuestas'])
            .groupBy('p.id, p.texto')
            .getRawMany();
        return {
            totalRespuestas,
            respuestasAbiertas,
            respuestasOpciones,
            respuestasVerdaderoFalso,
        };
    }
    async obtenerRespuestasVerdaderoFalso(respuestaId) {
        return await this.respuestaVerdaderoFalsoRepository.find({
            where: { respuesta: { id: respuestaId } },
            relations: ['opcion', 'opcion.pregunta']
        });
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
    async eliminarRespuestaVerdaderoFalso(id) {
        const respuesta = await this.respuestaVerdaderoFalsoRepository.findOne({
            where: { id }
        });
        if (!respuesta) {
            throw new common_1.NotFoundException(`Respuesta verdadero/falso con ID ${id} no encontrada`);
        }
        await this.respuestaVerdaderoFalsoRepository.remove(respuesta);
        return { message: 'Respuesta verdadero/falso eliminada correctamente' };
    }
};
exports.RespuestasService = RespuestasService;
exports.RespuestasService = RespuestasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(respuesta_entity_1.Respuesta)),
    __param(1, (0, typeorm_1.InjectRepository)(respuesta_abierta_entity_1.RespuestaAbierta)),
    __param(2, (0, typeorm_1.InjectRepository)(respuesta_opcion_entity_1.RespuestaOpcion)),
    __param(3, (0, typeorm_1.InjectRepository)(respuesta_verdadero_falso_entity_1.RespuestaVerdaderoFalso)),
    __param(4, (0, typeorm_1.InjectRepository)(encuestas_entity_1.Encuesta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RespuestasService);
//# sourceMappingURL=respuestas.service.js.map