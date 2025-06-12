import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Opcion } from '../../encuestas/entities/opcion.entity';

@Entity('respuestas_verdadero_falso')
export class RespuestaVerdaderoFalso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Respuesta, { 
    nullable: false, 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;

  @ManyToOne(() => Opcion, { nullable: false })
  @JoinColumn({ name: 'id_opcion' })
  opcion: Opcion;
} 