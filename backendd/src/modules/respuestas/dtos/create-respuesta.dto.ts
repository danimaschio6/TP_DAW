import { Type } from 'class-transformer';
import { 
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested, 
} from 'class-validator';
import { CreateRespuestaAbiertaDTO } from './create-respuesta-abierta.dto';
import { CreateRespuestaOpcionDTO } from './create-respuesta-opcion.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRespuestaDTO {
    /*
    @ApiProperty({ type: [CreateRespuestaAbiertaDTO] })
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateRespuestaAbiertaDTO)
    respuestasAbiertas: CreateRespuestaAbiertaDTO[];

    @ApiProperty({ type: [CreateRespuestaOpcionDTO] })
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateRespuestaOpcionDTO)
    respuestasOpciones: CreateRespuestaOpcionDTO[];
    */

    // sacado de preguntasDTO
    //tiene mas sentido, veo probable encuestas 100% con multiplechoice o abiertas. por lo que la contraria deberia poder ser nula
    @ApiProperty({type: [CreateRespuestaAbiertaDTO], required: false})
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => CreateRespuestaAbiertaDTO)
    respuestasAbiertas?: CreateRespuestaAbiertaDTO[];

    @ApiProperty({type: [CreateRespuestaOpcionDTO], required: false})
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => CreateRespuestaOpcionDTO)
    respuestasOpciones?: CreateRespuestaOpcionDTO[];
}
