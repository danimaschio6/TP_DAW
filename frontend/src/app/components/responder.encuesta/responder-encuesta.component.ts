import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

// PrimeNG imports
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// DTOs y servicios
import { EncuestasService } from '../../services/encuestas.service';
import { EncuestaDTO } from '../../interfaces/encuesta.dto';
import { PreguntaDTO } from '../../interfaces/pregunta.dto';
import { CrearRespuestaDTO, RespuestaAbiertaDTO, RespuestaOpcionDTO } from '../responder.encuesta/responder-encuesta.component';
import { TiposRespuestaEnum } from '../../enums/tipos-pregunta.enum';
import { CodigoTipoEnum } from '../../enums/codigo-tipo.enum';
import { TextoErrorComponent } from '../texto-error/texto-error.component';

@Component({
  selector: 'app-responder-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabel,
    ButtonModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextareaModule,
    CardModule,
    DividerModule,
    ProgressSpinnerModule,
    TextoErrorComponent
  ],
  templateUrl: './responder-encuesta.component.html',
  styleUrl: './responder-encuesta.component.css'
})
export class ResponderEncuestaComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private encuestasService = inject(EncuestasService);

  // Signals para manejo de estado
  encuesta = signal<EncuestaDTO | null>(null);
  cargando = signal<boolean>(true);
  enviando = signal<boolean>(false);

  // Enums para el template
  TiposRespuesta = TiposRespuestaEnum;
  
  // Form principal
  form!: FormGroup;

  ngOnInit() {
    this.obtenerParametrosYCargarEncuesta();
  }

  private obtenerParametrosYCargarEncuesta() {
    this.route.queryParams.subscribe(params => {
      const idEncuesta = params['id-encuesta'];
      const codigoRespuesta = params['codigo-respuesta'];
      
      if (!idEncuesta || !codigoRespuesta) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Parámetros de encuesta faltantes'
        });
        this.router.navigateByUrl('/');
        return;
      }

      this.cargarEncuesta(Number(idEncuesta), codigoRespuesta);
    });
  }

  private cargarEncuesta(idEncuesta: number, codigo: string) {
    this.cargando.set(true);
    
    this.encuestasService.traerEncuesta(idEncuesta, codigo, CodigoTipoEnum.RESPUESTA)
      .subscribe({
        next: (encuesta) => {
          this.encuesta.set(encuesta);
          this.inicializarFormulario();
          this.cargando.set(false);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo cargar la encuesta'
          });
          this.cargando.set(false);
          this.router.navigateByUrl('/');
        }
      });
  }

  private inicializarFormulario() {
    const encuesta = this.encuesta();
    if (!encuesta) return;

    const formControls: any = {};

    // Crear controles para cada pregunta
    encuesta.preguntas.forEach(pregunta => {
      if (pregunta.tipo === TiposRespuestaEnum.ABIERTA) {
        // Pregunta abierta: campo de texto
        formControls[`pregunta_${pregunta.id}`] = new FormControl('', Validators.required);
        
      } else if (pregunta.tipo === TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE) {
        // Selección simple: radio button
        formControls[`pregunta_${pregunta.id}`] = new FormControl(null, Validators.required);
        
      } else if (pregunta.tipo === TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE) {
        // Selección múltiple: array de checkboxes
        const checkboxArray = new FormArray(
          pregunta.opciones?.map(() => new FormControl(false)) || [],
          this.alMenosUnoSeleccionado
        );
        formControls[`pregunta_${pregunta.id}`] = checkboxArray;
      }
    });

    this.form = new FormGroup(formControls);
  }

  // Validador personalizado para checkboxes
  private alMenosUnoSeleccionado(formArray: FormArray): any {
    const seleccionados = formArray.controls.some(control => control.value === true);
    return seleccionados ? null : { alMenosUnoRequerido: true };
  }

  enviarRespuesta() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todas las preguntas requeridas'
      });
      return;
    }

    const encuesta = this.encuesta();
    if (!encuesta) return;

    this.enviando.set(true);

    const respuestaDto: CrearRespuestaDTO = {
      encuestaId: encuesta.id,
      respuestasAbiertas: [],
      respuestasOpciones: []
    };

    // Procesar respuestas por tipo de pregunta
    encuesta.preguntas.forEach(pregunta => {
      const valorRespuesta = this.form.get(`pregunta_${pregunta.id}`)?.value;

      if (pregunta.tipo === TiposRespuestaEnum.ABIERTA) {
        // Respuesta abierta
        respuestaDto.respuestasAbiertas.push({
          preguntaId: pregunta.id,
          texto: valorRespuesta
        });

      } else if (pregunta.tipo === TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE) {
        // Selección simple
        if (valorRespuesta !== null) {
          respuestaDto.respuestasOpciones.push({
            opcionId: valorRespuesta
          });
        }

      } else if (pregunta.tipo === TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE) {
        // Selección múltiple
        if (Array.isArray(valorRespuesta)) {
          valorRespuesta.forEach((seleccionado, index) => {
            if (seleccionado && pregunta.opciones?.[index]) {
              respuestaDto.respuestasOpciones.push({
                opcionId: pregunta.opciones[index].id
              });
            }
          });
        }
      }
    });

    // Enviar respuesta al backend
    this.encuestasService.crearRespuesta(respuestaDto).subscribe({
      next: (respuesta) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Su respuesta ha sido enviada correctamente'
        });
        
        // Redirigir a página de confirmación o inicio
        this.router.navigateByUrl('/respuesta-enviada');
        this.enviando.set(false);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo enviar la respuesta. Intente nuevamente.'
        });
        this.enviando.set(false);
      }
    });
  }

  // Helpers para el template
  esPreguntaAbierta(pregunta: PreguntaDTO): boolean {
    return pregunta.tipo === TiposRespuestaEnum.ABIERTA;
  }

  esPreguntaSeleccionSimple(pregunta: PreguntaDTO): boolean {
    return pregunta.tipo === TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE;
  }

  esPreguntaSeleccionMultiple(pregunta: PreguntaDTO): boolean {
    return pregunta.tipo === TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE;
  }

  obtenerControlPregunta(preguntaId: number): FormControl {
    return this.form.get(`pregunta_${preguntaId}`) as FormControl;
  }

  obtenerArrayControlPregunta(preguntaId: number): FormArray {
    return this.form.get(`pregunta_${preguntaId}`) as FormArray;
  }
}