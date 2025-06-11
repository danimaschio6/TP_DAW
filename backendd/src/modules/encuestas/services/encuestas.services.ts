import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Encuesta } from '../entities/encuestas.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid'
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { NotFoundException } from '@nestjs/common';
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum'; // Importar el enum
import { CreateOpcionDTO } from '../dtos/create.opcion.dto'; // Importar CreateOpcionDTO

@Injectable()
export class EncuestasService {
    constructor(
        @InjectRepository(Encuesta)
        private encuestasRepository: Repository<Encuesta>,
    ) {}

    async crearEncuesta(dto: CreateEncuestaDTO): Promise<{
        id: number;
        codigoRespuesta: string;
        codigoResultados: string;
    }> {
        const encuesta: Encuesta = this.encuestasRepository.create({
            ...dto,
            preguntas: dto.preguntas.map(pregunta => {
        if (pregunta.tipo === TiposRespuestaEnum.VERDADERO_FALSO) {
          return {
            ...pregunta,
            opciones: [
              { texto: 'verdadero', numero: 1 } as CreateOpcionDTO,
              { texto: 'falso', numero: 2 } as CreateOpcionDTO,
            ],
          };
        }
        return pregunta;
      }),
            codigoRespuesta: v4(),
            codigoResultados: v4(),

        });

        const encuestaGuardada = await this.encuestasRepository.save(encuesta)

        return {
            id: encuestaGuardada.id,
            codigoRespuesta: encuestaGuardada.codigoRespuesta,
            codigoResultados: encuestaGuardada.codigoResultados
        }
    }

    async obtenerEncuesta(
        id: number, 
        codigo: string, 
        codigoTipo: CodigoTipoEnum.RESPUESTA | CodigoTipoEnum.RESULTADOS,

    ): Promise<Encuesta> {
        const query = this.encuestasRepository
            .createQueryBuilder('encuesta')
            .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
            .leftJoinAndSelect('pregunta.opciones','preguntaOpcion')
            .where('encuesta.id = :id', { id });

        switch (codigoTipo){
            case CodigoTipoEnum.RESPUESTA:
                query.andWhere('encuesta.codigoRespuesta = :codigo', { codigo });
                break;

            case CodigoTipoEnum.RESULTADOS:
                query.andWhere('encuesta.codigoResultados = :codigo', { codigo });
                break;

        }

        query.orderBy('pregunta.numero', 'ASC');
        query.addOrderBy('preguntaOpcion.numero', 'ASC');

        const encuesta = await query.getOne();

        if (!encuesta) {
            throw new BadRequestException('Datos de encuesta no validos');
        }

        return encuesta;
    }

    async obtenerEncuestaPorCodigoRespuesta(codigo: string): Promise<Encuesta> {
    const encuesta = await this.encuestasRepository.findOne({
        where: { codigoRespuesta: codigo },
        relations: ['preguntas', 'preguntas.opciones']
    });
    
    if (!encuesta) {
        throw new NotFoundException('Encuesta no encontrada');
    }
    
    return encuesta;
}

    async obtenerEncuestaPorCodigoResultados(codigo: string): Promise<Encuesta> {
        const encuesta = await this.encuestasRepository.findOne({
            where: { codigoResultados: codigo },
            relations: ['preguntas', 'preguntas.opciones']
        });
        
        if (!encuesta) {
            throw new NotFoundException('Encuesta no encontrada');
        }
        
        return encuesta;
    }
    
}