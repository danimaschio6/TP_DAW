// src/app/components/responder-encuesta/responder-encuesta.component.ts

import { Component, signal, inject } from '@angular/core';
// Importar ValidatorFn
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// PrimeNG Imports
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';

// Interfaces
import { EncuestaDTO } from '../../interfaces/encuesta.dto';
import { CrearRespuestaDTO } from '../../interfaces/crear-respuesta.dto';
import { RespuestaAbiertaDTO } from '../../interfaces/respuesta-abierta.dto';
import { RespuestaOpcionDTO } from '../../interfaces/respuesta-opcion.dto';

// Services y Enums
import { TiposRespuestaEnum } from '../../enums/tipos-pregunta.enum';
import { EncuestasService } from '../../services/encuestas.service';

// Componentes
import { TextoErrorComponent } from '../texto-error/texto-error.component';
import { SeccionComponent } from '../seccion/seccion.component'; 

@Component({
  selector: 'app-responder-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    RadioButtonModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    MessageModule,
    TextoErrorComponent,
    SeccionComponent,
    FloatLabelModule
  ],
  templateUrl: './responder-encuesta.component.html',
  styleUrl: './responder-encuesta.component.css'
})
export class ResponderEncuestaComponent {
  // Servicios
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private encuestasService = inject(EncuestasService);

  // Signals
  encuesta = signal<EncuestaDTO | null>(null);
  cargando = signal(false);
  enviando = signal(false);
  mensaje = signal<string | null>(null);

  // Form
  form: FormGroup = this.fb.group({});

  // Enum para template
  TiposRespuestaEnum = TiposRespuestaEnum;

  constructor() {
    this.cargarEncuesta();
  }

  private cargarEncuesta(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (!codigo) {
      this.mensaje.set('Error: No se encontró el código de la encuesta.');
      return;
    }

    this.cargando.set(true);
    this.encuestasService.obtenerEncuestaPorCodigoRespuesta(codigo).subscribe({
      next: (encuesta) => {
        this.encuesta.set(encuesta);
        this.inicializarFormulario(encuesta);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al cargar encuesta:', error);
        this.cargando.set(false);
        this.mensaje.set('No se pudo cargar la encuesta. Intenta más tarde.');
      }
    });
  }

  private inicializarFormulario(encuesta: EncuestaDTO): void {
    const controles: { [key: string]: FormControl | FormGroup } = {};

    encuesta.preguntas.forEach(pregunta => {
      const nombreControl = `pregunta_${pregunta.id}`;

      switch (pregunta.tipo) {
        case TiposRespuestaEnum.ABIERTA:
          controles[nombreControl] = new FormControl('', Validators.required);
          break;

        case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE:
          controles[nombreControl] = new FormControl(null, Validators.required);
          break;

        case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE:
          const opcionesControles: { [key: string]: FormControl } = {};
          pregunta.opciones?.forEach(opcion => {
            opcionesControles[`opcion_${opcion.id}`] = new FormControl(false);
          });

          // CORRECCIÓN: el validador se pasa como un array de ValidatorFn
          controles[nombreControl] = new FormGroup(
            opcionesControles,
            { validators: [this.alMenosUnoSeleccionadoValidator()] } // <--- ¡CAMBIO AQUÍ!
          );
          break;
        default:
          console.warn(`Tipo de pregunta desconocido: ${pregunta.tipo}`);
          break;
      }
    });

    this.form = this.fb.group(controles);
  }

  // CORRECCIÓN CLAVE: El validador ahora es una función que retorna otra función (ValidatorFn)
  // Esta función interna recibe AbstractControl y luego lo "asegura" como FormGroup.
  private alMenosUnoSeleccionadoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup; // <--- Hacemos un type assertion a FormGroup
      if (!group || !group.controls) { // Manejo de caso donde no es un FormGroup
        return null;
      }

      const algunoSeleccionado = Object.keys(group.controls).some(key => group.get(key)?.value === true);
      return algunoSeleccionado ? null : { alMenosUnoRequerido: true };
    };
  }


  onSubmit(): void {
    if (this.form.invalid || !this.encuesta()) {
      this.mensaje.set('Por favor, completa todos los campos requeridos.');
      return;
    }

    this.enviando.set(true);
    const respuestas = this.construirRespuestas();

    this.encuestasService.crearRespuesta(respuestas).subscribe({
      next: () => {
        this.mensaje.set('¡Respuesta enviada exitosamente!');
        this.form.reset();
        this.enviando.set(false);
      },
      error: (error) => {
        console.error('Error al enviar respuesta:', error);
        this.mensaje.set('Error al enviar la respuesta. Intenta de nuevo.');
        this.enviando.set(false);
      }
    });
  }

  private construirRespuestas(): CrearRespuestaDTO {
    const encuesta = this.encuesta()!;
    const respuestasAbiertas: RespuestaAbiertaDTO[] = [];
    const respuestasOpciones: RespuestaOpcionDTO[] = [];

    encuesta.preguntas.forEach(pregunta => {
      const nombreControl = `pregunta_${pregunta.id}`;
      const valor = this.form.get(nombreControl)?.value;

      switch (pregunta.tipo) {
        case TiposRespuestaEnum.ABIERTA:
          if (valor) {
            respuestasAbiertas.push({
              preguntaId: pregunta.id, // Asegúrate de que este nombre (preguntaId) coincide con el backend
              texto: valor
            });
          }
          break;

        case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE:
          if (valor !== null) {
            respuestasOpciones.push({
              preguntaId: pregunta.id, // ¡Importante! Probablemente necesites esto para el backend
              opcionId: valor // Asegúrate de que este nombre (opcionId) coincide con el backend
            });
          }
          break;

        case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE:
          if (valor && typeof valor === 'object') {
            Object.keys(valor).forEach(key => {
              if (valor[key] === true) {
                const opcionId = parseInt(key.replace('opcion_', ''));
                respuestasOpciones.push({
                  preguntaId: pregunta.id, // Asegúrate de que este nombre (preguntaId) coincide con el backend
                  opcionId: opcionId
                });
              }
            });
          }
          break;
      }
    });

    return {
      encuestaId: encuesta.id, // Asegúrate de que este nombre (encuestaId) coincide con el backend
      respuestasAbiertas,
      respuestasOpciones
    };
  }

  getFormGroupErrors(controlName: string): ValidationErrors | null | undefined {
    const control = this.form.get(controlName);
    return control?.errors;
  }



   getPreguntaFormGroup(preguntaId: number): FormGroup {
    return this.form.get(`pregunta_${preguntaId}`) as FormGroup;
  }
}

