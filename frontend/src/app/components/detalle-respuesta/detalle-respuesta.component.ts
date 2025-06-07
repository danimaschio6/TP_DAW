import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';

import { EncuestasService } from '../../services/encuestas.service';
import { RespuestasService } from '../../services/respuestas.service';
import { EncuestaDTO } from '../../interfaces/encuesta.dto';
import { RespuestaDTO } from '../../interfaces/respuesta.dto';
import { TiposRespuestaEnum } from '../../enums/tipos-pregunta.enum';
import { OpcionDTO } from '../../interfaces/opcion.dto';

@Component({
  selector: 'app-detalle-respuesta',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    DividerModule,
    TagModule,
    PanelModule
  ],
  templateUrl: './detalle-respuesta.component.html',
  styleUrl: './detalle-respuesta.component.css'
})
export class DetalleRespuestaComponent implements OnInit {
  encuesta = signal<EncuestaDTO | null>(null);
  respuesta = signal<RespuestaDTO | null>(null);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  // Enum para usar en template
  TiposRespuestaEnum = TiposRespuestaEnum;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private encuestasService = inject(EncuestasService);
  private respuestasService = inject(RespuestasService);
  private messageService = inject(MessageService);

  ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    const respuestaIdStr = this.route.snapshot.paramMap.get('respuestaId');
    
    if (codigo && respuestaIdStr) {
      const respuestaId = parseInt(respuestaIdStr);
      if (!isNaN(respuestaId)) {
        this.cargarDetalleRespuesta(codigo, respuestaId);
      } else {
        this.manejarError('ID de respuesta no válido');
      }
    } else {
      this.manejarError('Parámetros de URL no válidos');
    }
  }

  private cargarDetalleRespuesta(codigo: string, respuestaId: number): void {
    this.cargando.set(true);
    this.error.set(null);

    // Primero obtenemos la encuesta por código de resultados
    this.encuestasService.obtenerEncuestaPorCodigoResultados(codigo).subscribe({
      next: (encuesta) => {
        this.encuesta.set(encuesta);
        
        // Luego obtenemos el detalle de la respuesta específica
        this.respuestasService.obtenerRespuesta(respuestaId).subscribe({
          next: (respuesta) => {
              console.log('Valor de respuesta.encuestaId ANTES DE IF:', respuesta.encuesta?.id);
             console.log('Valor de encuesta.id ANTES DE IF:', encuesta.id);
              console.log('¿Son estrictamente iguales (===)?', respuesta.encuesta?.id === encuesta.id);
              
              // AGREGAR LOGS ADICIONALES PARA DEBUG
              console.log('Tipo de respuestasAbiertas:', typeof respuesta.respuestasAbiertas);
              console.log('¿Es array respuestasAbiertas?:', Array.isArray(respuesta.respuestasAbiertas));
              console.log('Longitud respuestasAbiertas:', respuesta.respuestasAbiertas?.length);
              console.log('Contenido respuestasAbiertas:', respuesta.respuestasAbiertas);
              
              console.log('Tipo de respuestasOpciones:', typeof respuesta.respuestasOpciones);
              console.log('¿Es array respuestasOpciones?:', Array.isArray(respuesta.respuestasOpciones));
              console.log('Longitud respuestasOpciones:', respuesta.respuestasOpciones?.length);
              console.log('Contenido respuestasOpciones:', respuesta.respuestasOpciones);
          
          
            if (respuesta.encuesta?.id === encuesta.id) {
              this.respuesta.set(respuesta);
              console.log('Respuesta cargada:', this.respuesta());
              console.log('Respuestas Abiertas:', this.respuesta()?.respuestasAbiertas);
              console.log('Respuestas Opciones:', this.respuesta()?.respuestasOpciones);
            } else {
              this.manejarError('La respuesta no pertenece a esta encuesta');
            }
            this.cargando.set(false);
          },
          error: (error) => {
            console.error('Error al cargar respuesta:', error);
            this.manejarError('No se pudo cargar el detalle de la respuesta');
            this.cargando.set(false);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar encuesta:', error);
        this.manejarError('El código de resultados no es válido');
        this.cargando.set(false);
      }
    });
  }

  private manejarError(mensaje: string): void {
    this.error.set(mensaje);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje
    });
  }

  volverListaRespuestas(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    this.router.navigate(['/lista-respuestas', codigo]);
  }

  verEstadisticas(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    this.router.navigate(['/resultados', codigo]);
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }

  // CORREGIDO: Acepta tanto Date como string
  formatearFecha(fecha: Date | string): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // Obtener respuesta abierta para una pregunta específica
  obtenerRespuestaAbierta(preguntaId: number): string | null {
    const respuesta = this.respuesta();
    if (!respuesta || !respuesta.respuestasAbiertas) {
      console.log('No hay respuesta o respuestasAbiertas es null/undefined');
      return null;
    }

    
    
    const respuestaAbierta = respuesta.respuestasAbiertas?.find(
      ra => ra.pregunta?.id === preguntaId
    );
    
    return respuestaAbierta ? respuestaAbierta.texto : null;
  }

  // Obtener respuestas de opciones para una pregunta específica
  obtenerRespuestasOpciones(preguntaId: number): any[] {
    const respuesta = this.respuesta();
    const encuesta = this.encuesta();


    if (!respuesta || !encuesta || !encuesta.preguntas || !respuesta.respuestasOpciones) {
       console.log('Faltan datos para obtener respuestas de opciones');
       return [];
    }

    const question = encuesta.preguntas.find(
        p => p.id === preguntaId && p.tipo !== this.TiposRespuestaEnum.ABIERTA
    );

    if (!question || !question.opciones) {
        return [];
    } 
    
    return respuesta.respuestasOpciones?.filter(
      ro => question.opciones!.some(opt => opt.id === ro.opcion!.id)) || [];
  }

  // Verificar si una pregunta tiene respuesta
  tieneRespuesta(preguntaId: number, tipo: TiposRespuestaEnum): boolean {
    if (tipo === TiposRespuestaEnum.ABIERTA) {
      return this.obtenerRespuestaAbierta(preguntaId) !== null;
    } else {
      return this.obtenerRespuestasOpciones(preguntaId).length > 0;
    }
  }

  // NUEVO: Método para verificar si una opción está seleccionada
  esOpcionSeleccionada(preguntaId: number, opcionId: number): boolean {
  const respuesta = this.respuesta();
      if (!respuesta?.respuestasOpciones) {
      console.log(`[esOpcionSeleccionada][Pregunta ${preguntaId}] No hay respuestasOpciones en la respuesta total.`);
      return false;
  }






    const seleccionada = this.obtenerRespuestasOpciones(preguntaId).some(ro => ro.opcionId === opcionId);
    return seleccionada;
  }


  obtenerClaseOpcion(preguntaId: number, opcionId: number): string {
    const seleccionada = this.esOpcionSeleccionada(preguntaId, opcionId);
    return seleccionada ? 'pi-check-circle' : 'pi-circle';
  }
}