import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { Exclude } from 'class-transformer';
  
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
}