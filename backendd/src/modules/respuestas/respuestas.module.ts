
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from './entities/respuesta.entity';
import { RespuestaAbierta } from './entities/respuesta-abierta.entity';
import { RespuestaOpcion } from './entities/respuesta-opcion.entity';
import { RespuestasService } from './services/respuestas.service';
import { RespuestasController } from './controllers/respuesta.controller';
import { EncuestasModule } from '../encuestas/encuestas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Respuesta,
      RespuestaAbierta,
      RespuestaOpcion
    ]),
    EncuestasModule
  ],
  controllers: [RespuestasController],
  providers: [RespuestasService],
  exports: [RespuestasService],
})
export class RespuestasModule {}