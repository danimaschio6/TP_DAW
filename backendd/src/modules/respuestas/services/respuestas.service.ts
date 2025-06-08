import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRespuestaDTO } from '../dtos/create-respuesta.dto';
import { Respuesta } from '../entities/respuesta.entity';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';



@Injectable()
export class RespuestasService {
    constructor(
        @InjectRepository(Respuesta)
        private respuestasRepository: Repository<Respuesta>,
    ) {}

    async crearRespuesta(dto: CreateRespuestaDTO): Promise<{
        id: number;
        //codigoRespuesta: string;
        //codigoResultados: string;
    }> {
        
        const respuesta: Respuesta = this.respuestasRepository.create(
            dto
        );

        const respuestaGuardada = await this.respuestasRepository.save(respuesta)

        return {
            id: respuestaGuardada.id,
            //codigoRespuesta: encuestaGuardada.codigoRespuesta,
            //codigoResultados: encuestaGuardada.codigoResultados
        }
    }

    /*
    //No tiene uso? Salvo que querramos mostrar resultados
    async obtenerEncuesta(
        id: number, 
        codigo: string, 
        codigoTipo: CodigoTipoEnum.RESPUESTA | CodigoTipoEnum.RESULTADOS,

    ): Promise<Respuesta> {
        const query = this.respuestasRepository
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
     */
    
}