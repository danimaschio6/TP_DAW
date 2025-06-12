import { Body, Controller, Get, Param, Post, Put, Query, Patch } from "@nestjs/common";
import { EncuestasService } from "../services/encuestas.services";
import { CreateEncuestaDTO } from "../dtos/create-encuesta.dto";
import { Encuesta } from "../entities/encuestas.entity";
import { ObtenerEncuestaDto } from '../dtos/obtener-encuesta.dto';
import { UpdateEncuestaEstadoDTO } from "../dtos/update-encuesta-estado.dto";

@Controller("/encuestas")
export class EncuestaController {

    constructor(private encuestasService: EncuestasService) {

    }


    @Post()
    async crearEncuesta(@Body() dto: CreateEncuestaDTO): Promise<{
        id: number,
        codigoRespuesta: string;
        codigoResultados: string;
    }> {
        return await this.encuestasService.crearEncuesta(dto);

    }

    @Get(':id')  //ejemplo de ruta: /api/v1/encuestas/7
    async obtenerEncuesta(
        @Param('id') id: number,
        @Query() dto: ObtenerEncuestaDto,
    ): Promise<Encuesta> {
        return await this.encuestasService.obtenerEncuesta(
            id,
            dto.codigo,
            dto.tipo,
        );

    }

    @Get('respuesta/:codigo')
    async obtenerEncuestaPorCodigoRespuesta(
        @Param('codigo') codigo: string
    ): Promise<Encuesta> {
        return await this.encuestasService.obtenerEncuestaPorCodigoRespuesta(codigo);
    }

    @Get('resultados/:codigo')
    async obtenerEncuestaPorCodigoResultados(
        @Param('codigo') codigo: string
    ): Promise<Encuesta> {
        return await this.encuestasService.obtenerEncuestaPorCodigoResultados(codigo);
    }

    // Este es el endpoint para obtener TODAS las encuestas
    @Get() // Esto responderá a GET /api/v1/encuestas
    async getAllEncuestas(): Promise<Encuesta[]> {
        return await this.encuestasService.getAllEncuestas();
    }

    // Endpoint para actualizar estado (si lo tienes)
    @Put(':id/estado')
    async updateEncuestaEstado(
    @Param('id') id: number,
    @Body() dto: UpdateEncuestaEstadoDTO,
    ): Promise<Encuesta> {
    return await this.encuestasService.updateEncuestaEstado(id, dto);
    }
}

