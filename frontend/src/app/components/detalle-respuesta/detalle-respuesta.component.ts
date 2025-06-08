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

    this.encuestasService.obtenerEncuestaPorCodigoResultados(codigo).subscribe({
      next: (encuesta) => {
        this.encuesta.set(encuesta);
        
        this.respuestasService.obtenerRespuesta(respuestaId).subscribe({
          next: (respuesta) => {
            console.log('🔍 Respuesta completa recibida:', respuesta);
            console.log('📝 Respuestas abiertas:', respuesta.respuestasAbiertas);
            console.log('✅ Respuestas opciones:', respuesta.respuestasOpciones);
            
            if (respuesta.encuesta?.id === encuesta.id) {
              this.respuesta.set(respuesta);
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

  formatearFecha(fecha: Date | string): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  obtenerRespuestaAbierta(preguntaId: number): string | null {
    const respuesta = this.respuesta();
    if (!respuesta?.respuestasAbiertas) return null;
    
    const respuestaAbierta = respuesta.respuestasAbiertas.find(
      ra => ra.pregunta?.id === preguntaId
    );
    
    return respuestaAbierta?.texto || null;
  }

  // 🔧 MÉTODO CORREGIDO: Obtener opciones seleccionadas con texto
  obtenerRespuestasOpciones(preguntaId: number): any[] {
    const respuesta = this.respuesta();
    const encuesta = this.encuesta();

    if (!respuesta?.respuestasOpciones || !encuesta?.preguntas) {
      console.log('❌ Faltan datos para obtener respuestas de opciones');
      return [];
    }

    // Buscar la pregunta
    const pregunta = encuesta.preguntas.find(p => p.id === preguntaId);
    if (!pregunta?.opciones) {
      console.log('❌ No se encontró la pregunta o no tiene opciones');
      return [];
    }

    // Filtrar respuestas que pertenecen a esta pregunta
    const respuestasDeEstaPregunta = respuesta.respuestasOpciones.filter(ro => {
      // Verificar si la opción pertenece a esta pregunta
      return pregunta.opciones!.some(opt => opt.id === ro.opcion?.id);
    });

    // Mapear para incluir el texto de la opción
    const respuestasConTexto = respuestasDeEstaPregunta.map(ro => ({
      id: ro.id,
      opcionId: ro.opcion?.id,
      texto: pregunta.opciones!.find(opt => opt.id === ro.opcion?.id)?.texto || 'Opción no encontrada'
    }));

    console.log(`✅ Respuestas para pregunta ${preguntaId}:`, respuestasConTexto);
    return respuestasConTexto;
  }

  tieneRespuesta(preguntaId: number, tipo: TiposRespuestaEnum): boolean {
    if (tipo === TiposRespuestaEnum.ABIERTA) {
      return this.obtenerRespuestaAbierta(preguntaId) !== null;
    } else {
      return this.obtenerRespuestasOpciones(preguntaId).length > 0;
    }
  }

  // 🔧 MÉTODO CORREGIDO: Verificar si opción está seleccionada
  esOpcionSeleccionada(preguntaId: number, opcionId: number): boolean {
    const respuestasOpciones = this.obtenerRespuestasOpciones(preguntaId);
    const seleccionada = respuestasOpciones.some(ro => ro.opcionId === opcionId);
    
    console.log(`🔍 ¿Opción ${opcionId} de pregunta ${preguntaId} seleccionada?`, seleccionada);
    return seleccionada;
  }

  obtenerClaseOpcion(preguntaId: number, opcionId: number): string {
    return this.esOpcionSeleccionada(preguntaId, opcionId) ? 'pi-check-circle' : 'pi-circle';
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
}