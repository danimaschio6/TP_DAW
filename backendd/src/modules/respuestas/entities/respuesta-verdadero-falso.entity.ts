import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Opcion } from '../../encuestas/entities/opcion.entity';
import { Pregunta } from 'src/modules/encuestas/entities/pregunta.entity';

/*
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
*/

//DIONI VF
@Entity('respuestas_verdadero_falso')
export class RespuestaVerdaderoFalso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Respuesta, respuesta => respuesta.respuestasVerdaderoFalso, { 
    nullable: false, 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;

  @ManyToOne(() => Pregunta, { nullable: false })
  @JoinColumn({ name: 'id_pregunta' })
  pregunta: Pregunta;
  
  /*
  @Column({ type: 'boolean', nullable: false })
  valor_respuesta: boolean;//OJO ACA? Habria que nombrar valorRespuesta la prop y agregar name: 'valor_respuesta'
  */
  
  //lo comentado arriba ya aplicado
  @Column({ name: 'valor_respuesta', type: 'boolean', nullable: false })
  valorRespuesta: boolean;

}
//