// src/modules/respuestas/respuestas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { RespuestaAbierta } from '../entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../entities/respuesta-opcion.entity';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
    
    @InjectRepository(RespuestaAbierta)
    private respuestaAbiertaRepository: Repository<RespuestaAbierta>,
    
    @InjectRepository(RespuestaOpcion)
    private respuestaOpcionRepository: Repository<RespuestaOpcion>,
  ) {}

  // Crear una nueva respuesta completa a una encuesta
  async crearRespuesta(encuestaId: number, respuestasData: any) {
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


   //LOGS PARA DEBUG
    console.log('Respuesta encontrada:', respuesta);
    console.log('Respuestas abiertas:', respuesta.respuestasAbiertas);
    console.log('Respuestas opciones:', respuesta.respuestasOpciones);


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
}