// src/modules/respuestas/respuestas.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { RespuestaAbierta } from '../entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../entities/respuesta-opcion.entity';
import { RespuestaVerdaderoFalso } from '../entities/respuesta-verdadero-falso.entity';
import { Encuesta } from '../../encuestas/entities/encuestas.entity';
import { CreateRespuestaVerdaderoFalsoDto } from '../dtos/respuesta-verdadero-falso.dto';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
    
    @InjectRepository(RespuestaAbierta)
    private respuestaAbiertaRepository: Repository<RespuestaAbierta>,
    
    @InjectRepository(RespuestaOpcion)
    private respuestaOpcionRepository: Repository<RespuestaOpcion>,

    @InjectRepository(RespuestaVerdaderoFalso)
    private respuestaVerdaderoFalsoRepository: Repository<RespuestaVerdaderoFalso>,

    //DIONI fecha_vencimiento
    @InjectRepository(Encuesta)
    private encuestaRepository: Repository<Encuesta>,
  ) {}

  // Crear una nueva respuesta completa a una encuesta
  async crearRespuesta(encuestaId: number, respuestasData: any) {
    //DIONI fecha_vencimiento
    const encuesta = await this.encuestaRepository.findOne({ where: { id: encuestaId } });
    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada');
    }
    if (encuesta.fechaVencimiento && new Date() > encuesta.fechaVencimiento) {//MANEJAR ERROR en front?
      throw new BadRequestException('La encuesta ya ha vencido y no se puede responder');
    }

    // Crear la respuesta principal
    const respuesta = this.respuestaRepository.create({
      encuesta: { id: encuestaId }
    });
    
    const respuestaGuardada = await this.respuestaRepository.save(respuesta);

    // Procesar respuestas abiertas
    if (respuestasData.respuestasAbiertas && respuestasData.respuestasAbiertas.length > 0) {
      const respuestasAbiertas = respuestasData.respuestasAbiertas.map(ra => 
        this.respuestaAbiertaRepository.create({
          respuesta: respuestaGuardada,
          pregunta: { id: ra.preguntaId },
          texto: ra.texto
        })
      );
      await this.respuestaAbiertaRepository.save(respuestasAbiertas);
    }

    // Procesar respuestas de opciones
    if (respuestasData.respuestasOpciones && respuestasData.respuestasOpciones.length > 0) {
      const respuestasOpciones = respuestasData.respuestasOpciones.map(ro =>
        this.respuestaOpcionRepository.create({
          respuesta: respuestaGuardada,
          opcion: { id: ro.opcionId }
        })
      );
      await this.respuestaOpcionRepository.save(respuestasOpciones);
    }

    return this.obtenerRespuestaCompleta(respuestaGuardada.id);
  }

  // Crear una respuesta verdadero/falso
  async crearRespuestaVerdaderoFalso(respuestaId: number, dto: CreateRespuestaVerdaderoFalsoDto) {
    const respuesta = await this.respuestaRepository.findOne({
      where: { id: respuestaId }
    });

    if (!respuesta) {
      throw new NotFoundException(`Respuesta con ID ${respuestaId} no encontrada`);
    }

    const respuestaVerdaderoFalso = this.respuestaVerdaderoFalsoRepository.create({
      respuesta: { id: respuestaId },
      opcion: { id: dto.opcionId }
    });

    return await this.respuestaVerdaderoFalsoRepository.save(respuestaVerdaderoFalso);
  }

  // Obtener TODAS las respuestas de todas las encuestas
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

  // Obtener una respuesta completa con todas sus sub-respuestas
  async obtenerRespuestaCompleta(respuestaId: number) {
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
      throw new NotFoundException(`Respuesta con ID ${respuestaId} no encontrada`);
    }

    return respuesta;
  }

  // Obtener todas las respuestas de una encuesta específica
  async obtenerRespuestasPorEncuesta(encuestaId: number) {
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

  // Obtener estadísticas básicas de respuestas por encuesta
  async obtenerEstadisticasEncuesta(encuestaId: number) {
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

  // Obtener todas las respuestas verdadero/falso de una respuesta
  async obtenerRespuestasVerdaderoFalso(respuestaId: number) {
    return await this.respuestaVerdaderoFalsoRepository.find({
      where: { respuesta: { id: respuestaId } },
      relations: ['opcion', 'opcion.pregunta']
    });
  }

  // Eliminar una respuesta (por si es necesario para testing)
  async eliminarRespuesta(respuestaId: number) {
    const respuesta = await this.respuestaRepository.findOne({
      where: { id: respuestaId }
    });

    if (!respuesta) {
      throw new NotFoundException(`Respuesta con ID ${respuestaId} no encontrada`);
    }

    await this.respuestaRepository.remove(respuesta);
    return { message: 'Respuesta eliminada correctamente' };
  }

  // Eliminar una respuesta verdadero/falso
  async eliminarRespuestaVerdaderoFalso(id: number) {
    const respuesta = await this.respuestaVerdaderoFalsoRepository.findOne({
      where: { id }
    });

    if (!respuesta) {
      throw new NotFoundException(`Respuesta verdadero/falso con ID ${id} no encontrada`);
    }

    await this.respuestaVerdaderoFalsoRepository.remove(respuesta);
    return { message: 'Respuesta verdadero/falso eliminada correctamente' };
  }
}