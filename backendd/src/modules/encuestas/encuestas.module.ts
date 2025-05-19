import { Module } from '@nestjs/common';
import { EncuestasService } from './services/encuestas.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from './entities/encuestas.entity';
import { Pregunta } from './entities/pregunta.entity';
import { Opcion } from './entities/opcion.entity';
import { EncuestaController } from './controllers/encuestas.controllers';


@Module({
    imports:[TypeOrmModule.forFeature([Encuesta,Pregunta,Opcion])],  //pasar entidades q vamos a utilizar en nuestro modulo
    // controllers: [EncuestasModule],
    controllers: [EncuestaController],
    providers: [EncuestasService],
})

export class EncuestasModule{
    

}