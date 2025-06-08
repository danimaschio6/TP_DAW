import {
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Encuesta } from '../../encuestas/entities/encuestas.entity';
import { RespuestaAbierta } from './respuesta-abierta.entity';
import { RespuestaOpcion } from './respuesta-opcion.entity';

@Entity('respuestas')
export class Respuesta {
    @PrimaryGeneratedColumn()//esta ok como autogenerada?
    id: number;

    @ManyToOne(() => Encuesta)//es eso many to one?
    @JoinColumn({ name: 'id_encuesta' })
    @Exclude()
    encuesta: Encuesta;

    /*asi o uno-uno en respuesta?*/
    @OneToMany(() => RespuestaAbierta, (respuestaAbierta) => respuestaAbierta.respuesta, {   //una encuesta esta relacionada con muchas respuestas
        cascade: ['insert'], 
    })
    respuestasAbiertas: RespuestaAbierta[];
    
    //asi o uno-uno en respuesta?
    @OneToMany(() => RespuestaOpcion, (respuestaOpcion) => respuestaOpcion.respuesta, {   //una encuesta esta relacionada con muchas respuestas
        cascade: ['insert'], 
    })
    respuestasOpciones: RespuestaOpcion[];
    

}