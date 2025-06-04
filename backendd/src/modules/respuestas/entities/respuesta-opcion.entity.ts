import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Opcion } from '../../encuestas/entities/opcion.entity';

@Entity('respuestas_opciones')
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Respuesta)
  respuesta: Respuesta;

  @ManyToOne(() => Opcion)
  opcion: Opcion;
}
