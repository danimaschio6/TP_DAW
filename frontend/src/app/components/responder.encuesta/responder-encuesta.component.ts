import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Importaciones de PrimeNG y componentes personalizados
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextoErrorComponent } from '../texto-error/texto-error.component'
import { SeccionComponent } from '../seccion/seccion.component'

// Importaciones de servicios y DTOs (ajusta las rutas si es necesario)
import { EncuestasService } from '../../services/encuestas.service';
import { RespuestasService } from '../../services/respuestas.service';
import { EncuestaDTO } from '../../interfaces/encuesta.dto'
import { TiposRespuestaEnum } from '../../enums/tipos-pregunta.enum';
import { CrearRespuestaPayloadDTO,RespuestaAbiertaPayloadDTO, RespuestaOpcionPayloadDTO } from '../../interfaces/crear-respuesta-payload.dto';

//DIONI VF
import { RespuestaVerdaderoFalsoPayloadDTO } from '../../interfaces/crear-respuesta-payload.dto';
//

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
    FloatLabelModule,
    TextoErrorComponent,
    SeccionComponent,
  ],
  templateUrl: './responder-encuesta.component.html',
  styleUrl: './responder-encuesta.component.css'
})
export class ResponderEncuestaComponent {
  // Servicios
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private encuestasService = inject(EncuestasService);
  private respuestasService = inject(RespuestasService);

  // Signals
  encuesta = signal<EncuestaDTO | null>(null);
  cargando = signal(false);
  enviando = signal(false);
  enviadoConExito = signal(false);
  mensajeError = signal<string | null>(null);
  encuestaDeshabilitada = signal(false); // Signal agregado para manejar encuesta deshabilitada

  //DIONI fecha_vencimiento
    encuestaVencida = signal<Boolean>(false);
  //

  // Form
  form: FormGroup = this.fb.group({});

  // Enum para usar en la plantilla
  TiposRespuestaEnum = TiposRespuestaEnum;

  constructor() {
    this.cargarEncuesta();
  }

  private cargarEncuesta(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (!codigo) {
      this.mensajeError.set('Error: No se encontró el código de la encuesta.');
      return;
    }

    this.cargando.set(true);
    this.encuestasService.obtenerEncuestaPorCodigoRespuesta(codigo).subscribe({
      next: (encuesta) => {
        //DIONI fecha_vencimiento Es necesario? El back no deberia ni darlo?
        if (encuesta.fechaVencimiento && new Date() > new Date(encuesta.fechaVencimiento)) {
          //debug
          // const fechaAhora= new Date();
          // const fechaEncuesta=new Date(encuesta.fechaVencimiento);
          // console.log(fechaAhora);
          // console.log(fechaEncuesta);
          // console.log(fechaAhora>fechaEncuesta);//true
          // console.log(fechaAhora<fechaEncuesta);//false
          
          this.encuestaVencida.set(true);
          this.cargando.set(false);
          return ;
        }

        this.encuesta.set(encuesta);
        
        // Verificar si la encuesta está deshabilitada
        if (!encuesta.habilitada) {
          this.encuestaDeshabilitada.set(true);
        } else {
          this.inicializarFormulario(encuesta);
        }
        
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al cargar encuesta:', error);
        this.cargando.set(false);
        
        // Verificar si el error es específicamente por encuesta deshabilitada
        if (error.status === 403 || error.error?.message?.includes('deshabilitada') || error.error?.message?.includes('disabled')) {
          this.encuestaDeshabilitada.set(true);
        } else {
          this.mensajeError.set('No se pudo cargar la encuesta. Intenta más tarde.');
        }
      }
    });
    
  }

  private inicializarFormulario(encuesta: EncuestaDTO): void {
    const controles: { [key: string]: AbstractControl } = {};

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
          controles[nombreControl] = new FormGroup(opcionesControles, { 
            validators: [this.alMenosUnoSeleccionadoValidator()] 
          });
          break;
        case TiposRespuestaEnum.VERDADERO_FALSO:
          controles[nombreControl] = new FormControl(null, Validators.required);
          break;
      }
    });

    this.form = this.fb.group(controles);
  }

  private alMenosUnoSeleccionadoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      if (!group || !group.controls) return null;
      const algunoSeleccionado = Object.keys(group.controls).some(key => group.get(key)?.value === true);
      return algunoSeleccionado ? null : { alMenosUnoRequerido: true };
    };
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensajeError.set('Por favor, completa todos los campos requeridos.');
      return;
    }
    if (!this.encuesta()) return;

    this.enviando.set(true);
    this.mensajeError.set(null);
    
    const respuestas = this.construirRespuestas();
    console.log('Enviando respuestas:', respuestas);
    
    this.respuestasService.crearRespuesta(respuestas).subscribe({
      next: () => {
        this.enviadoConExito.set(true);
        this.enviando.set(false);
      },
      error: (error) => {
        console.error('Error al enviar respuesta:', error);
        let mensajeError = 'Error al enviar la respuesta. ';
        
        if (error.error?.message) {
          mensajeError += error.error.message;
        } else if (error.status === 400) {
          mensajeError += 'Los datos enviados no son válidos.';
        } else if (error.status === 403) {
          mensajeError += 'No tienes permiso para enviar esta respuesta.';
        } else if (error.status === 404) {
          mensajeError += 'La encuesta no existe o ya no está disponible.';
        } else {
          mensajeError += 'Intenta de nuevo más tarde.';
        }
        
        this.mensajeError.set(mensajeError);
        this.enviando.set(false);
      }
    });
  }

  private construirRespuestas(): CrearRespuestaPayloadDTO {
    const encuesta = this.encuesta()!;
    const respuestasAbiertas: RespuestaAbiertaPayloadDTO[] = [];
    const respuestasOpciones: RespuestaOpcionPayloadDTO[] = [];
    const respuestasVerdaderoFalso: RespuestaVerdaderoFalsoPayloadDTO[] = [];

    encuesta.preguntas.forEach(pregunta => {
      const nombreControl = `pregunta_${pregunta.id}`;
      const valor = this.form.get(nombreControl)?.value;

      switch (pregunta.tipo) {
        case TiposRespuestaEnum.ABIERTA:
          if (valor && valor.trim()) {
            respuestasAbiertas.push({
              preguntaId: pregunta.id,
              texto: valor.trim(),
            });
          }
          break;

        case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE:
          if (valor !== null && valor !== undefined) {
            respuestasOpciones.push({ opcionId: valor });
          }
          break;

        case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE:
          if (valor && typeof valor === 'object') {
            Object.keys(valor).forEach(key => {
              if (valor[key] === true) {
                const opcionId = parseInt(key.replace('opcion_', ''));
                respuestasOpciones.push({ opcionId: opcionId });
              }
            });
          }
          break;

        case TiposRespuestaEnum.VERDADERO_FALSO:
          if (valor !== null && valor !== undefined) {
            respuestasVerdaderoFalso.push({ 
              preguntaId: pregunta.id,
              valorRespuesta: valor 
            });
          }
          break;
      }
    });

    return {
      encuestaId: encuesta.id,
      respuestasAbiertas: respuestasAbiertas.length > 0 ? respuestasAbiertas : [],
      respuestasOpciones: respuestasOpciones.length > 0 ? respuestasOpciones : [],
      respuestasVerdaderoFalso: respuestasVerdaderoFalso.length > 0 ? respuestasVerdaderoFalso : []
    };
  }
  
  getPreguntaFormGroup(preguntaId: number): FormGroup {
    return this.form.get(`pregunta_${preguntaId}`) as FormGroup;
  }
}