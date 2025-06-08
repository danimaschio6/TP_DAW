import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Encuesta } from './encuestas.entity';
import { Exclude } from 'class-transformer';
import { Opcion } from './opcion.entity';
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';
import { RespuestaAbierta } from 'src/modules/respuestas/entities/respuesta-abierta.entity';

@Entity({ name: 'preguntas' })
export class Pregunta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numero: number;

    // @Column({ name: 'pregunta_texto' })
    // texto: string;

    @Column()
    texto: string;

    @Column({ type: 'enum', enum: TiposRespuestaEnum })
    tipo: TiposRespuestaEnum;

    @ManyToOne(() => Encuesta)
    @JoinColumn({ name: 'id_encuesta' })
    @Exclude()
    encuesta: Encuesta;

    @OneToMany(() => Opcion, (opcion) => opcion.pregunta, { 
        cascade: ['insert'] 
    })
    opciones: Opcion[];

    /*// esta bien o es uno-uno*/
    @OneToMany(() => RespuestaAbierta, (respuestaAbierta) => respuestaAbierta.pregunta, {
        cascade: ['insert']
    })
    respuestasAbiertas: RespuestaAbierta[];
    
}