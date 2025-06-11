import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { Pregunta } from './pregunta.entity'

@Entity({name: "encuestas"}) // esto genera que se mape esta entidad a nuestra BDD

export class Encuesta{
    @PrimaryGeneratedColumn() // esto le indica al ORM que va a ser una clave primaria autogenerada
    id: number; 

    @Column({name: 'nombre'}) // se puede configurar nombre y otra opciones 
    nombre: string;

    @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, {   //una encuesta esta relacionada con muchas preguntas
        cascade: ['insert'], 

    })
    preguntas: Pregunta[];

    @Column({ name: 'codigo_respuesta' })
    codigoRespuesta: string;

    @Column({ name: 'codigo_resultados' })
    @Exclude() 
    codigoResultados: string;

    //DIONI
    @Column({ name: 'fecha_vencimiento', type: 'timestamp', nullable: true }) // puede ser opcional
    fechaVencimiento?: Date|null;
    //

}