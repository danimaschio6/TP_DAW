import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Encuesta } from '../../encuestas/entities/encuestas.entity';
import { RespuestaAbierta } from './respuesta-abierta.entity';
import { RespuestaOpcion } from './respuesta-opcion.entity';
import { RespuestaVerdaderoFalso } from './respuesta-verdadero-falso.entity';

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Encuesta, { nullable: false })
  @JoinColumn({ name: 'id_encuesta' })
  encuesta: Encuesta;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;


  @OneToMany(() => RespuestaAbierta, respuestaAbierta => respuestaAbierta.respuesta, { cascade: true })
  respuestasAbiertas: RespuestaAbierta[];

  @OneToMany(() => RespuestaOpcion, respuestaOpcion => respuestaOpcion.respuesta, { cascade: true })
  respuestasOpciones: RespuestaOpcion[];

  @OneToMany(() => RespuestaVerdaderoFalso, respuestaVerdaderoFalso => respuestaVerdaderoFalso.respuesta, { cascade: true })
  respuestasVerdaderoFalso: RespuestaVerdaderoFalso[];
}