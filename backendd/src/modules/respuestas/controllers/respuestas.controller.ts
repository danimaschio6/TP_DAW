import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { RespuestasService } from "../services/respuestas.service";
import { CreateRespuestaDTO } from "../dtos/create-respuesta.dto";
import { Respuesta } from "../entities/respuesta.entity";

//import { ObtenerRespuestaDto } from '../dtos/obtener-respuesta.dto'

@Controller("/respuestas")
export class RespuestaController{

    constructor(private respuestasService: RespuestasService){

    }

    @Post()
    async crearRespuesta(@Body() dto: CreateRespuestaDTO): Promise<{
        //cambiar por las propiedades correspondientes
        /*
        id: number,
        codigoRespuesta: string;
        codigoResultados: string;
        */
        id: number,

    }> {
        return await this.respuestasService.crearRespuesta(dto); 
    }
    
    /*
    @Get(':id')  //ejemplo de ruta: /api/v1/encuestas/7
    async obtenerRespuesta(
        @Param('id') id: number,
        @Query() dto: ObtenerRespuestaDto,
    ):Promise<Respuesta>{
        return await this.respuestasService.obtenerEncuesta(
            //cambiar por las propiedades correspondientes
            id,
            dto.codigo,
            dto.tipo,
        );
    }
    */

}