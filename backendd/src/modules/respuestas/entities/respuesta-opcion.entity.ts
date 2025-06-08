import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Opcion } from '../../encuestas/entities/opcion.entity';
import { Exclude } from 'class-transformer';

@Entity('respuestas_opciones')
export class RespuestaOpcion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Opcion)
    @JoinColumn({ name: 'id_opcion' })
    @Exclude()
    opcion: Opcion;

    /*//asi o uno-uno?*/
    @ManyToOne(() => Respuesta)
    @JoinColumn({ name: 'id_respuesta' })
    @Exclude()
    respuesta: Respuesta;
    
}
