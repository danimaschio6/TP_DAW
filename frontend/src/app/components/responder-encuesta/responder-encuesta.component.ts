import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RespuestasService } from '../../services/respuestas.service';

import { CreateRespuestaDTO } from '../../interfaces/create-respuesta.dto';
import { Router } from '@angular/router';

@Component({
    selector: 'app-responder-encuesta',
    imports: [],
    templateUrl: './responder-encuesta.component.html',
    styleUrl: './responder-encuesta.component.css'
})
export class ResponderEncuestaComponent {
    form: FormGroup;
    
    private messageService: MessageService = inject(MessageService);

    private router: Router = inject(Router);

    private confirmationService: ConfirmationService = inject(ConfirmationService);

    //seguro necesito tambien el de encuestas para traer
    private respuestasService: RespuestasService = inject(RespuestasService);

    constructor() {
        this.form = new FormGroup({
            nombre: new FormControl<string>('', Validators.required),
            preguntas: new FormArray<FormControl<PreguntaDTO>>(
                [],
                [Validators.required, Validators.minLength(1)]
            ),
        });
    }

    agregarPregunta(pregunta: PreguntaDTO) {
        this.preguntas.push(
        new FormControl<PreguntaDTO>(pregunta) as FormControl<PreguntaDTO>
        );
    }

    getTipoPreguntaPresentacion(tipo: TiposRespuestaEnum): string {
        return tiposPreguntaPresentacion.find(
        (tipoPresentacion) => tipoPresentacion.tipo === tipo
        )!?.presentacion;
    }

    confirmarEnviarRespuestas() {
        this.confirmationService.confirm({
        message: 'Desea enviar sus respuestas?',
        header: 'Confirmación',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Confirmar',
        },
        accept: () => {
            this.crearRespuesta();
        },
        });
    }

    crearRespuesta() {
        if (!this.form.valid) {
        this.form.markAllAsTouched();
        this.messageService.add({
            severity: 'error',
            summary: 'Hay errores en el formulario',
        });
        return;
        }

        const respuestas: CreateRespuestaDTO = this.form.value;

        for (let i = 0; i < respuestas.preguntas.length; i++) {
        const pregunta = respuestas.preguntas[i];
        pregunta.numero = i + 1;

        if (pregunta.opciones) {
            for (let j = 0; j < pregunta.opciones.length; j++) {
            pregunta.opciones[j].numero = j + 1;
            }
        }
        }

        this.respuestasService.crearRespuesta(respuestas).subscribe({
        next: (res) => {
            this.messageService.add({
            severity: 'success',
            summary: 'La encuesta se creó con éxito',
            });

            this.router.navigateByUrl(
            ''
            );
        },
        error: (err) => {
            this.messageService.add({
            severity: 'error',
            summary: 'Ha ocurrido un error al crear la encuesta',
            });
        },
        });
    }
}
