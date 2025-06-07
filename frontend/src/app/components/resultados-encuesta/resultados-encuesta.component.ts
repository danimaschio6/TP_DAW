import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast'; // Importado para mostrar mensajes
import { CommonModule } from '@angular/common';

import { EncuestasService } from '../../services/encuestas.service';
import { RespuestasService } from '../../services/respuestas.service';
import { EstadisticasEncuestaDTO } from '../../interfaces/estadisticas-encuesta.dto';
import { EncuestaDTO } from '../../interfaces/encuesta.dto'; // Necesario para obtenerEncuestaPorCodigoResultados

import { Subject, takeUntil } from 'rxjs'; // Importar para gestión de suscripciones

@Component({
  selector: 'app-resultados-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    ToastModule, // Añadir ToastModule aquí
  ],
  providers: [MessageService], // Proveer MessageService si no está en el root
  templateUrl: './resultados-encuesta.component.html',
  styleUrl: './resultados-encuesta.component.css'
})
export class ResultadosEncuestaComponent implements OnInit, OnDestroy {
  estadisticas = signal<EstadisticasEncuestaDTO | null>(null);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private encuestasService = inject(EncuestasService);
  private respuestasService = inject(RespuestasService);
  private messageService = inject(MessageService);
  private destroy$ = new Subject<void>(); // Para gestionar la desuscripción

  ngOnInit() {
    this.cargarEstadisticasDesdeRuta();
  }

  ngOnDestroy(): void {
    // Asegurarse de que todas las suscripciones se cierren al destruir el componente
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarEstadisticasDesdeRuta(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.cargarEstadisticas(codigo);
    } else {
      this.error.set('Código de resultados no válido');
      this.messageService.add({
        severity: 'error',
        summary: 'Código de resultados no válido',
        detail: 'El código de la encuesta en la URL es inválido o no se proporcionó.'
      });
      // Considera si quieres redirigir automáticamente o permitir que el usuario vea el error
      // this.router.navigate(['/']);
      this.cargando.set(false); // Detener el spinner si hay un error inicial
    }
  }

  private cargarEstadisticas(codigo: string): void {
    this.cargando.set(true);
    this.error.set(null);

    // Primero obtenemos la encuesta por código de resultados
    this.encuestasService.obtenerEncuestaPorCodigoResultados(codigo)
      .pipe(takeUntil(this.destroy$)) // Gestión de suscripción
      .subscribe({
        next: (encuesta: EncuestaDTO) => { // Asegúrate de que el tipo de retorno sea EncuestaDTO
          if (encuesta && encuesta.id) {
            this.respuestasService.obtenerEstadisticasEncuesta(encuesta.id)
              .pipe(takeUntil(this.destroy$)) // Gestión de suscripción
              .subscribe({
                next: (estadisticas: EstadisticasEncuestaDTO) => {
                  console.log('Estadísticas cargadas:', estadisticas); // Para debugging
                  this.estadisticas.set(estadisticas);
                  this.cargando.set(false);
                },
                error: (error) => {
                  console.error('Error al cargar estadísticas:', error);
                  this.error.set('No se pudieron obtener los resultados de las respuestas.');
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error al cargar estadísticas',
                    detail: 'No se pudieron obtener los resultados de las respuestas.'
                  });
                  this.cargando.set(false);
                }
              });
          } else {
            this.manejarError('No se pudo obtener el ID de la encuesta para cargar estadísticas.');
            this.cargando.set(false);
          }
        },
        error: (error) => {
          console.error('Error al cargar encuesta por código de resultados:', error);
          this.manejarError('El código de resultados de la encuesta no es válido o no existe.');
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

  recargarEstadisticas(): void {
    this.cargarEstadisticasDesdeRuta();
  }

  obtenerPorcentajeFormateado(porcentaje: number): string {
    return `${porcentaje.toFixed(1)}%`;
  }

  tieneRespuestas(): boolean {
    const stats = this.estadisticas();
    return stats ? stats.totalRespuestas > 0 : false;
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }

  // Método que maneja el clic del botón "Ver Lista de Respuestas"
  verListaRespuestas(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    console.log('Intentando navegar a lista de respuestas.');
    console.log('Código obtenido de la ruta:', codigo); // Debug: Verificar el valor de 'codigo'

    if (codigo) {
      this.router.navigate(['/lista-respuestas', codigo]);
      console.log('Navegación iniciada a:', ['/lista-respuestas', codigo]); // Debug: Confirmar navegación
    } else {
      console.warn('Advertencia: El código de la encuesta es nulo al intentar ver la lista de respuestas.');
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No se pudo obtener el código de la encuesta para ver la lista de respuestas.'
      });
    }
  }
}
