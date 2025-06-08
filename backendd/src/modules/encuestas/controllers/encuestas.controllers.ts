import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { EncuestasService } from "../services/encuestas.services";
import { CreateEncuestaDTO } from "../dtos/create-encuesta.dto";
import { Encuesta } from "../entities/encuestas.entity";
import { ObtenerEncuestaDto } from '../dtos/obtener-encuesta.dto'

@Controller("/encuestas")
export class EncuestaController{

    constructor(private encuestasService: EncuestasService){

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
    ):Promise<Encuesta>{
        return await this.encuestasService.obtenerEncuesta(
            id,
            dto.codigo,
            dto.tipo,
        );

    }


}