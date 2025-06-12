import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SeccionComponent } from '../seccion/seccion.component';
import { ButtonModule } from 'primeng/button';
import { GestionPreguntaDialogComponent } from '../gestion-pregunta-dialog/gestion-pregunta-dialog.component';
import { PreguntaDTO } from '../../interfaces/pregunta.dto';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  tiposPreguntaPresentacion,
  TiposRespuestaEnum,
} from '../../enums/tipos-pregunta.enum';
import { TextoErrorComponent } from '../texto-error/texto-error.component';
import { EncuestasService } from '../../services/encuestas.service';
import { Router } from '@angular/router';
import { CreateEncuestaDTO } from '../../interfaces/create-encuesta.dto';

@Component({
  selector: 'app-creacion-encuesta',
  imports: [
    InputTextModule,
    FloatLabel,
    FormsModule,
    SeccionComponent,
    ButtonModule,
    GestionPreguntaDialogComponent,
    ReactiveFormsModule,
    TextoErrorComponent,
  ],
  templateUrl: './creacion-encuesta.component.html',
  styleUrl: './creacion-encuesta.component.css',
})
export class CreacionEncuestaComponent {
  form: FormGroup;

  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);
  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private encuestasService: EncuestasService = inject(EncuestasService);

  dialogGestionPreguntaVisible = signal<boolean>(false);
  preguntaSeleccionada = signal<PreguntaDTO | null>(null);
  
  //fechaMinima = signal<string>(new Date().toISOString().split('T')[0]);//se puede todo en una linea?
  fechaMinimaVencimiento = signal<string | null>(null);

  constructor() {
    this.form = new FormGroup({
      nombre: new FormControl<string>('', Validators.required),
      descripcion: new FormControl<string>(''), // <-- campo opcional
      preguntas: new FormArray<FormControl<PreguntaDTO>>(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
      fechaVencimiento: new FormControl<string| null>(null),
    });

    //fecha minima para vencimiento - si da error quitar y chau - tambien la propiedad min en input date html
    const hoy= new Date();
    // Formatear la fecha en YYYY-MM-DD
    const hoyProcesado= hoy.toISOString().split('T')[0]
    this.fechaMinimaVencimiento.set(hoyProcesado);
  }

  get preguntas(): FormArray<FormControl<PreguntaDTO>> {
    return this.form.get('preguntas') as FormArray<FormControl<PreguntaDTO>>;
  }

  get nombre(): FormControl<string> {
    return this.form.get('nombre') as FormControl<string>;
  }

  get fechaVencimiento(): FormControl<string> {
    return this.form.get('fechaVencimiento') as FormControl<string>;
  }

  abrirDialog() {
    this.dialogGestionPreguntaVisible.set(true);
  }

  agregarPregunta(pregunta: PreguntaDTO) {
    // Si es VERDADERO_FALSO, aseguramos que no haya opciones (el backend las genera)
    // sirve para algo? preguntas abiertas tampoco tienen opciones y no se les hace este tratamiento y no da problema
    if (pregunta.tipo === TiposRespuestaEnum.VERDADERO_FALSO) {
      pregunta.opciones = [];
    }

    this.preguntas.push(
      new FormControl<PreguntaDTO>(pregunta) as FormControl<PreguntaDTO>
    );
  }

  eliminarPregunta(index: number) {
    this.preguntas.removeAt(index);
  }

  getTipoPreguntaPresentacion(tipo: TiposRespuestaEnum): string {
    return tiposPreguntaPresentacion.find(
      (tipoPresentacion) => tipoPresentacion.tipo === tipo
    )!?.presentacion;
  }

  confirmarCrearEncuesta() {
    this.confirmationService.confirm({
      message: 'Confirmar creación de encuesta?',
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
        this.crearEncuesta();
      },
    });
  }

  confirmarEliminarPregunta(index: number) {
    this.confirmationService.confirm({
      message: 'Confirmar eliminación?',
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
        this.eliminarPregunta(index);
      },
    });
  }

  crearEncuesta() {
    //verificacion de validez del form
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Hay errores en el formulario',
      });
      return;
    }

    //esto es pq da problemas enviar un objeto date al back desde el front
    const fechaFormulario= this.form.value.fechaVencimiento;
    const fechaString= fechaFormulario ? new Date(fechaFormulario).toISOString() : null;

    const encuesta: CreateEncuestaDTO = {
      nombre: this.form.value.nombre,
      preguntas: this.form.value.preguntas.map((pregunta: PreguntaDTO) => {
        const { id, ...rest } = pregunta; // Excluir id
        return rest;
      }),
      fechaVencimiento: fechaString,
    
    };

    //console.log('Datos enviados al backend:', encuesta); // Depuración debug

    for (let i = 0; i < encuesta.preguntas.length; i++) {
      const pregunta = encuesta.preguntas[i];
      pregunta.numero = i + 1;

      if (pregunta.opciones) {
        for (let j = 0; j < pregunta.opciones.length; j++) {
          pregunta.opciones[j].numero = j + 1;
        }
      }
    }

    this.encuestasService.crearEncuesta(encuesta).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'La encuesta se creó con éxito',
        });

        this.router.navigateByUrl('/encuesta-creada', {
          state: {
            encuestaId: res.id,
            codigoRespuesta: res.codigoRespuesta,
            codigoResultados: res.codigoResultados,
          },
        });
      },
      error: (err) => {
        console.log('Error del backend:', err); // Depuración
        this.messageService.add({
          severity: 'error',
          summary: 'Ha ocurrido un error al crear la encuesta',
        });
      }
    });
  }
}
