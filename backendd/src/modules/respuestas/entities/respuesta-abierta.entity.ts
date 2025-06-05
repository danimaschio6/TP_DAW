import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Pregunta } from '../../encuestas/entities/pregunta.entity';

@Entity('respuestas_abiertas')
export class RespuestaAbierta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Respuesta, respuesta => respuesta.respuestasAbiertas, { 
    nullable: false, 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;

  @ManyToOne(() => Pregunta, { nullable: false })
  @JoinColumn({ name: 'id_pregunta' })
  pregunta: Pregunta;

  @Column({ type: 'text', nullable: false })
  texto: string;
}