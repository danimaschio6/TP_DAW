import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Opcion } from '../../encuestas/entities/opcion.entity';

@Entity('respuestas_opciones')
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Respuesta, respuesta => respuesta.respuestasOpciones, { 
    nullable: false, 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;

  @ManyToOne(() => Opcion, { nullable: false })
  @JoinColumn({ name: 'id_opcion' })
  opcion: Opcion;
}