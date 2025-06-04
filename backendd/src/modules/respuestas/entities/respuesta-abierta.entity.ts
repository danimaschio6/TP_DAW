import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Pregunta } from '../../encuestas/entities/pregunta.entity';

@Entity('respuestas_abiertas')
export class RespuestaAbierta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Respuesta)
  respuesta: Respuesta;

  @ManyToOne(() => Pregunta)
  pregunta: Pregunta;

  @Column()
  texto: string;
}
