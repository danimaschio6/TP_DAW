import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { Pregunta } from './pregunta.entity'
import { Respuesta } from "src/modules/respuestas/entities/respuesta.entity";

@Entity({name: "encuestas"}) // esto genera que se mapee esta entidad a nuestra BDD
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
    @Exclude() //indagar el por que del exclude
    codigoResultados: string;

    /*//asi o uno-uno?*/
    @OneToMany(() => Respuesta, (respuesta) => respuesta.encuesta, {   //una encuesta esta relacionada con muchas respuestas
        cascade: ['insert'], 
    })
    respuestas: Respuesta[];
    
   
}