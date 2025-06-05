import { 
  Controller, 
  Post, 
  Get, 
  Delete,
  Body, 
  Param, 
  ParseIntPipe,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { RespuestasService } from '../services/respuestas.service';
import { CrearRespuestaDto } from '../dtos/crear-respuesta.dto';

@Controller('respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  // POST /respuestas - Crear una nueva respuesta a una encuesta
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crearRespuesta(@Body() crearRespuestaDto: CrearRespuestaDto) {
    const { encuestaId, ...respuestasData } = crearRespuestaDto;
    return await this.respuestasService.crearRespuesta(encuestaId, respuestasData);
  }

  // GET /respuestas/:id - Obtener una respuesta específica con todos sus detalles
  @Get(':id')
  async obtenerRespuesta(@Param('id', ParseIntPipe) id: number) {
    return await this.respuestasService.obtenerRespuestaCompleta(id);
  }

  // GET /respuestas/encuesta/:encuestaId - Obtener todas las respuestas de una encuesta
  @Get('encuesta/:encuestaId')
  async obtenerRespuestasPorEncuesta(@Param('encuestaId', ParseIntPipe) encuestaId: number) {
    return await this.respuestasService.obtenerRespuestasPorEncuesta(encuestaId);
  }

  // GET /respuestas/encuesta/:encuestaId/estadisticas - Obtener estadísticas de respuestas
  @Get('encuesta/:encuestaId/estadisticas')
  async obtenerEstadisticasEncuesta(@Param('encuestaId', ParseIntPipe) encuestaId: number) {
    return await this.respuestasService.obtenerEstadisticasEncuesta(encuestaId);
  }

  // DELETE /respuestas/:id - Eliminar una respuesta (útil para testing)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminarRespuesta(@Param('id', ParseIntPipe) id: number) {
    await this.respuestasService.eliminarRespuesta(id);
  }
}