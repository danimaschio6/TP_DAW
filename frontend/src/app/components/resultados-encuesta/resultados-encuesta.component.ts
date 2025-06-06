// src/app/components/resultados-encuesta/resultados-encuesta.component.ts

import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // 🔧 MEJORA: Spinner para carga
import { SeccionComponent } from '../seccion/seccion.component';
import { EncuestasService } from '../../services/encuestas.service';
import { RespuestasService } from '../../services/respuestas.service'; // 🔧 CAMBIO: Usar servicio correcto
import { EstadisticasEncuestaDTO } from '../../interfaces/estadisticas-encuesta.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultados-encuesta',
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    SeccionComponent,
  ],
  templateUrl: './resultados-encuesta.component.html',
  styleUrl: './resultados-encuesta.component.css'
})
export class ResultadosEncuestaComponent implements OnInit {
  estadisticas = signal<EstadisticasEncuestaDTO | null>(null);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null); // 🔧 MEJORA: Manejo de errores específicos

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private encuestasService = inject(EncuestasService);
  private respuestasService = inject(RespuestasService); // 🔧 CAMBIO: Usar servicio correcto
  private messageService = inject(MessageService);

  ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.cargarEstadisticas(codigo);
    } else {
      this.error.set('Código de resultados no válido');
      this.messageService.add({
        severity: 'error',
        summary: 'Código de resultados no válido'
      });
      this.router.navigate(['/']);
    }
  }

  private cargarEstadisticas(codigo: string): void {
    this.cargando.set(true);
    this.error.set(null);

    // Primero obtenemos la encuesta por código de resultados
    this.encuestasService.obtenerEncuestaPorCodigoResultados(codigo).subscribe({
      next: (encuesta) => {
        // 🔧 CAMBIO: Usar el servicio correcto para estadísticas
        this.respuestasService.obtenerEstadisticasEncuesta(encuesta.id!).subscribe({
          next: (estadisticas) => {
            console.log('Estadísticas cargadas:', estadisticas); // Para debugging
            this.estadisticas.set(estadisticas);
            this.cargando.set(false);
          },
          error: (error) => {
            console.error('Error al cargar estadísticas:', error);
            this.error.set('No se pudieron obtener los resultados');
            this.messageService.add({
              severity: 'error',
              summary: 'Error al cargar estadísticas',
              detail: 'No se pudieron obtener los resultados'
            });
            this.cargando.set(false);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar encuesta:', error);
        this.error.set('El código de resultados no es válido');
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar la encuesta',
          detail: 'El código de resultados no es válido'
        });
        this.cargando.set(false);
      }
    });
  }

  // 🔧 MEJORA: Método para recargar estadísticas
  recargarEstadisticas(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.cargarEstadisticas(codigo);
    }
  }

  // 🔧 MEJORA: Método para obtener porcentaje formateado
  obtenerPorcentajeFormateado(porcentaje: number): string {
    return `${porcentaje.toFixed(1)}%`;
  }

  // 🔧 MEJORA: Método para determinar si una pregunta tiene respuestas
  tieneRespuestas(): boolean {
    const stats = this.estadisticas();
    return stats ? stats.totalRespuestas > 0 : false;
  }

  // 🔧 MEJORA: Navegación de vuelta
  volverInicio(): void {
    this.router.navigate(['/']);
  }
}