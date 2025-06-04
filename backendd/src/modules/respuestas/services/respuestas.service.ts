import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Respuesta } from '../../respuestas/entities/respuesta.entity';
import { RespuestaAbierta } from '../../respuestas/entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../../respuestas/entities/respuesta-opcion.entity';
import { Encuesta } from '../../encuestas/entities/encuestas.entity';
import { Pregunta } from '../../encuestas/entities/pregunta.entity';
import { Opcion } from '../../encuestas/entities/opcion.entity';
import { CreateRespuestaDTO } from '../../respuestas/dtos/create-respuesta.dto';
import { TiposRespuestaEnum } from '../../respuestas/enums/tipo-respuesta.enum';
import { CodigoTipoEnum } from '../../respuestas/enums/codigo-tipo.enum';


@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private readonly respuestaRepo: Repository<Respuesta>,

    @InjectRepository(RespuestaAbierta)
    private readonly respuestaAbiertaRepo: Repository<RespuestaAbierta>,

    @InjectRepository(RespuestaOpcion)
    private readonly respuestaOpcionRepo: Repository<RespuestaOpcion>,

    @InjectRepository(Encuesta)
    private readonly encuestaRepo: Repository<Encuesta>,

    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,

    @InjectRepository(Opcion)
    private readonly opcionRepo: Repository<Opcion>,
  ) {}

  async crearRespuesta(data: CreateRespuestaDTO) {
    const encuesta = await this.encuestaRepo.findOneBy({ id: data.idEncuesta });
    if (!encuesta) throw new Error('Encuesta no encontrada');

    const nuevaRespuesta = this.respuestaRepo.create({
      encuesta,
      codigo: CodigoTipoEnum.RESPUESTA,
    });

    await this.respuestaRepo.save(nuevaRespuesta);

    for (const r of data.respuestas) {
      const pregunta = await this.preguntaRepo.findOneBy({ id: r.idPregunta });
      if (!pregunta) continue;

      switch (r.tipo) {
        case TiposRespuestaEnum.ABIERTA:
          if (r.texto) {
            const abierta = this.respuestaAbiertaRepo.create({
              respuesta: nuevaRespuesta,
              pregunta,
              texto: r.texto,
            });
            await this.respuestaAbiertaRepo.save(abierta);
          }
          break;

        case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE:
        case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE:
          if (r.opciones?.length) {
            const opciones = await this.opcionRepo.findBy({
              id: In(r.opciones),
            });

            const respuestasOpciones = opciones.map((opcion) =>
              this.respuestaOpcionRepo.create({
                respuesta: nuevaRespuesta,
                opcion,
              }),
            );

            await this.respuestaOpcionRepo.save(respuestasOpciones);
          }
          break;

        default:
          console.warn(`Tipo de respuesta no reconocido: ${r.tipo}`);
          break;
      }
    }

    return { mensaje: 'Respuestas guardadas correctamente' };
  }
}