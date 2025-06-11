import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { Pregunta } from './pregunta.entity'

@Entity({ name: "encuestas" })
export class Encuesta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre' })
    nombre: string;

    @Column({ name: 'descripcion', nullable: true, type: 'text' }) // ⬅️ nuevo campo opcional
    descripcion?: string;

    @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, {
        cascade: ['insert'],
    })
    preguntas: Pregunta[];

    @Column({ name: 'codigo_respuesta' })
    codigoRespuesta: string;

    @Column({ name: 'codigo_resultados' })
    @Exclude()
    codigoResultados: string;
}
