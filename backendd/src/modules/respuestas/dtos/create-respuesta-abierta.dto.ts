import { 
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRespuestaAbiertaDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    texto: string;
}