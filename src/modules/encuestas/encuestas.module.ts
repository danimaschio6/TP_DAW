import { Module } from '@nestjs/common';
import { EncuestasService } from './services/encuestas.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from './entities/encuestas.entity';
import { Pregunta } from './entities/pregunta.entity';
import { Opcion } from './entities/opcion.entity';


@Module({
    imports:[TypeOrmModule.forFeature([Encuesta,Pregunta,Opcion])],  //pasar entidades q vamos a utilizar en nuestro modulo
    controllers: [EncuestasModule],
    providers: [EncuestasService],
})

export class EncuestasModule{

}