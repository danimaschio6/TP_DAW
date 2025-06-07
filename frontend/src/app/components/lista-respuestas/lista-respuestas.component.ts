import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

import { EncuestasService } from '../../services/encuestas.service';
import { RespuestasService } from '../../services/respuestas.service';
import { EncuestaDTO } from '../../interfaces/encuesta.dto';
import { RespuestaDTO } from '../../interfaces/respuesta.dto';
import { CodigoTipoEnum } from '../../enums/codigo-tipo.enum';

@Component({
  selector: 'app-lista-respuestas',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    TableModule,
    TagModule,
    DividerModule
  ],
  templateUrl: './lista-respuestas.component.html',
  styleUrl: './lista-respuestas.component.css'
})
export class ListaRespuestasComponent implements OnInit {
  encuesta = signal<EncuestaDTO | null>(null);
  respuestas = signal<RespuestaDTO[]>([]);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private encuestasService = inject(EncuestasService);
  private respuestasService = inject(RespuestasService);
  private messageService = inject(MessageService);

  ngOnInit() {
    console.log('🚀 ListaRespuestasComponent se está inicializando.');
    
    // 🔍 DEBUGGING: Verificar parámetros de la ruta
    const codigo = this.route.snapshot.paramMap.get('codigo');
    console.log('📋 Código obtenido de la ruta:', codigo);
    console.log('🌐 URL actual:', this.router.url);
    console.log('📊 Parámetros de ruta:', this.route.snapshot.params);
    
    if (codigo) {
      this.cargarEncuestaYRespuestas(codigo);
    } else {
      console.error('❌ No se encontró código en la ruta');
      this.error.set('Código de resultados no válido');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Código de resultados no válido'
      });
      this.router.navigate(['/']);
    }
  }

  private cargarEncuestaYRespuestas(codigo: string): void {
    console.log('📥 Iniciando carga de encuesta y respuestas para código:', codigo);
    this.cargando.set(true);
    this.error.set(null);

    // 🔍 DEBUGGING: Información detallada sobre la carga
    console.log('⏳ Estado inicial - Cargando:', this.cargando());
    console.log('🔄 Llamando a obtenerEncuestaPorCodigoResultados...');

    // OPCIÓN 1: Usar el método original (puede fallar)
    this.encuestasService.obtenerEncuestaPorCodigoResultados(codigo).subscribe({
      next: (encuesta) => {
        console.log('✅ Encuesta obtenida exitosamente:', encuesta);
        console.log('🆔 ID de la encuesta:', encuesta.id);
        console.log('📝 Título de la encuesta:', encuesta.nombre);
        
        this.encuesta.set(encuesta);
        
        // Verificar que tenemos un ID válido
        if (!encuesta.id) {
          console.error('❌ La encuesta no tiene ID válido');
          this.error.set('Error: La encuesta no tiene un ID válido');
          this.cargando.set(false);
          return;
        }
        
        console.log('🔄 Cargando respuestas para encuesta ID:', encuesta.id);
        this.cargarRespuestasDeEncuesta(encuesta.id);
      },
      error: (error) => {
        console.error('❌ Error al cargar encuesta:', error);
        console.error('📊 Detalles del error:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        
        // 🔧 FALLBACK: Intentar con ID conocido (para testing)
        console.log('🔄 Intentando fallback con ID conocido...');
        this.intentarFallback(codigo);
      }
    });
  }

  private cargarRespuestasDeEncuesta(encuestaId: number): void {
    console.log('📋 Cargando respuestas para encuesta ID:', encuestaId);
    
    this.respuestasService.obtenerRespuestasPorEncuesta(encuestaId).subscribe({
      next: (respuestas) => {
        console.log('✅ Respuestas obtenidas exitosamente:', respuestas);
        console.log('📊 Cantidad de respuestas:', respuestas.length);
        console.log('📝 Primera respuesta (si existe):', respuestas[0]);
        
        this.respuestas.set(respuestas);
        this.cargando.set(false);
        
        // 🎯 ESTADÍSTICAS DE DEBUGGING
        this.mostrarEstadisticas(respuestas);
      },
      error: (error) => {
        console.error('❌ Error al cargar respuestas:', error);
        console.error('📊 Detalles del error de respuestas:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        
        this.error.set('No se pudieron cargar las respuestas');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las respuestas'
        });
        this.cargando.set(false);
      }
    });
  }

  private intentarFallback(codigo: string): void {
    console.log('🔧 Intentando método fallback...');
    
    // Intenta con un ID conocido (reemplaza 1 por un ID que sepas que existe)
    const idPrueba = 1; // 🚨 CAMBIAR POR UN ID REAL
    
    this.encuestasService.obtenerEncuestaConCodigo(idPrueba, codigo).subscribe({
      next: (encuesta) => {
        console.log('✅ Fallback exitoso - Encuesta obtenida:', encuesta);
        this.encuesta.set(encuesta);
        this.cargarRespuestasDeEncuesta(encuesta.id!);
      },
      error: (error) => {
        console.error('❌ Fallback también falló:', error);
        this.error.set('El código de resultados no es válido');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El código de resultados no es válido'
        });
        this.cargando.set(false);
      }
    });
  }

  private mostrarEstadisticas(respuestas: RespuestaDTO[]): void {
    console.log('📊 === ESTADÍSTICAS DE RESPUESTAS ===');
    console.log('📈 Total de respuestas:', respuestas.length);
    
    let totalAbiertas = 0;
    let totalOpciones = 0;
    
    respuestas.forEach((respuesta, index) => {
      const abiertas = this.contarRespuestasAbiertas(respuesta);
      const opciones = this.contarRespuestasOpciones(respuesta);
      
      console.log(`📝 Respuesta ${index + 1}:`, {
        id: respuesta.id,
        abiertas: abiertas,
        opciones: opciones,
        fechaCreacion: respuesta.fechaCreacion
      });
      
      totalAbiertas += abiertas;
      totalOpciones += opciones;
    });
    
    console.log('🎯 Totales:', {
      totalRespuestas: respuestas.length,
      respuestasAbiertas: totalAbiertas,
      respuestasOpciones: totalOpciones
    });
    console.log('📊 ============================');
  }

  verDetalleRespuesta(respuestaId: number): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    console.log('🔍 Navegando al detalle de respuesta:', { codigo, respuestaId });
    this.router.navigate(['/detalle-respuesta', codigo, respuestaId]);
  }

  verEstadisticas(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    console.log('📊 Navegando a estadísticas para código:', codigo);
    this.router.navigate(['/resultados', codigo]);
  }

  recargarRespuestas(): void {
    console.log('🔄 Recargando respuestas...');
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.cargarEncuestaYRespuestas(codigo);
    }
  }

  volverInicio(): void {
    console.log('🏠 Volviendo al inicio');
    this.router.navigate(['/']);
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  contarRespuestasAbiertas(respuesta: RespuestaDTO): number {
    const count = respuesta.respuestasAbiertas?.length || 0;
    return count;
  }

  contarRespuestasOpciones(respuesta: RespuestaDTO): number {
    const count = respuesta.respuestasOpciones?.length || 0;
    return count;
  }
}