import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { EncuestasService } from "../services/encuestas.services";
import { CreateEncuestaDTO } from "../dtos/create-encuesta.dto";
import { Encuesta } from "../entities/encuestas.entity";
import { ObtenerEncuestaDto } from '../dtos/obtener-encuesta.dto'
import { Patch } from "@nestjs/common";

@Controller("/encuestas")
export class EncuestaController{

    constructor(private encuestasService: EncuestasService){

    }


    @Post()
    async crearEncuesta(@Body() dto: CreateEncuestaDTO):Promise<{
        id: number,
        codigoRespuesta: string;
        codigoResultados: string;
    }> {
        return await this.encuestasService.crearEncuesta(dto); 
    
    }

    @Get()  // Esta debe ser la PRIMERA ruta @Get()
    async obtenerTodasLasEncuestas(): Promise<Encuesta[]> {
        return await this.encuestasService.obtenerTodasLasEncuestas();
    }
        
    @Get(':id')  //ejemplo de ruta: /api/v1/encuestas/7
    async obtenerEncuesta(
        @Param('id') id: number,
        @Query() dto: ObtenerEncuestaDto,
    ):Promise<Encuesta>{
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

    @Patch(':id/estado')
    async actualizarEstadoEncuesta(
        @Param('id') id: number,
        @Body() body: { habilitada: boolean }
    ): Promise<Encuesta> {
        return await this.encuestasService.actualizarEstadoEncuesta(id, body.habilitada);
    }

    @Get('validar/:codigo')
    async validarEncuestaParaResponder(
        @Param('codigo') codigo: string
    ): Promise<{ valida: boolean, mensaje?: string }> {
        try {
            await this.encuestasService.validarEncuestaParaResponder(codigo);
            return { valida: true };
        } catch (error) {
            return { 
                valida: false, 
                mensaje: error.message || 'La encuesta no está disponible' 
            };
        }
    }
  

}