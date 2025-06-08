import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Respuesta } from './respuesta.entity';
import { Pregunta } from '../../encuestas/entities/pregunta.entity';

@Entity('respuestas_abiertas')
export class RespuestaAbierta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    texto: string;

    @ManyToOne(() => Pregunta)
    @JoinColumn({ name: 'id_pregunta' })
    @Exclude()
    pregunta: Pregunta;

    /*//asi o uno-uno?*/
    @ManyToOne(() => Respuesta)
    @JoinColumn({ name: 'id_respuesta' })
    @Exclude()
    respuesta: Respuesta;
    
}
