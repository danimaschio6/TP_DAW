import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { RespuestaController } from './controllers/respuestas.controller';
import { RespuestasService } from './services/respuestas.service';

import { Respuesta } from './entities/respuesta.entity';
import { RespuestaOpcion } from './entities/respuesta-opcion.entity';
import { RespuestaAbierta } from './entities/respuesta-abierta.entity';


@Module({
    imports:[TypeOrmModule.forFeature([Respuesta, RespuestaOpcion, RespuestaAbierta])],  //pasar entidades q vamos a utilizar en nuestro modulo
    // controllers: [EncuestasModule],
    controllers: [RespuestaController],
    providers: [RespuestasService],
})

export class RespuestasModule{

}