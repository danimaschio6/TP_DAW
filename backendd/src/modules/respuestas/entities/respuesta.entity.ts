import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Encuesta } from '../../encuestas/entities/encuestas.entity';

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Encuesta)
  encuesta: Encuesta;
}