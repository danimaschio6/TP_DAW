import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { Exclude } from 'class-transformer';
import { RespuestaOpcion } from 'src/modules/respuestas/entities/respuesta-opcion.entity';
  
@Entity({ name: 'opciones' })
export class Opcion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    texto: string;
    
    @Column()
    numero: number;
  
    @ManyToOne(() => Pregunta)
    @JoinColumn({ name: 'id_pregunta' })
    @Exclude()
    pregunta: Pregunta;
    
    /*//asi va?*/
    @OneToMany(() => RespuestaOpcion, (respuestaOpcion) => respuestaOpcion.opcion, {   //una encuesta esta relacionada con muchas preguntas
        cascade: ['insert'], 
    })
    respuestasOpciones: RespuestaOpcion[];
    
}
