import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

// Services
import { EncuestasService } from '../../services/encuestas.service';

// Interfaces y Enums
import { EncuestaDTO } from '../../interfaces/encuesta.dto';
import { EstadisticasEncuestaDTO, EstadisticaPreguntaDTO } from '../../interfaces/estadisticas-encuesta.dto';
import { CodigoTipoEnum } from '../../enums/codigo-tipo.enum';
import { TiposRespuestaEnum } from '../../enums/tipos-pregunta.enum';

@Component({
  selector: 'app-resultados-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    MessageModule,
    ChartModule,
    TabViewModule,
    TableModule,
    TagModule
  ],
  templateUrl: './resultados-encuesta.component.html',
  styleUrls: ['./resultados-encuesta.component.scss']
})
export class ResultadosEncuestaComponent implements OnInit {
  
  // ========== DEPENDENCY INJECTION ==========
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private encuestasService = inject(EncuestasService);

  // ========== SIGNALS ==========
  encuesta = signal<EncuestaDTO | null>(null);
  estadisticas = signal<EstadisticasEncuestaDTO | null>(null);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  // ========== CHART DATA ==========
  chartData = signal<any>({});
  chartOptions = signal<any>({});

  // ========== ENUMS PARA TEMPLATE ==========
  readonly TiposRespuestaEnum = TiposRespuestaEnum;

  ngOnInit(): void {
    this.cargarResultados();
    this.configurarGraficos();
  }

  // ========== MÉTODOS PRINCIPALES ==========
  private cargarResultados(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    
    if (!codigo) {
      this.error.set('Código de resultados no válido');
      this.cargando.set(false);
      return;
    }

    this.buscarEncuestaPorCodigo(codigo);
  }

  private buscarEncuestaPorCodigo(codigo: string): void {
    const encuestaId = this.extraerIdDelCodigo(codigo);
    
    if (!encuestaId) {
      this.error.set('Código de resultados no válido');
      this.cargando.set(false);
      return;
    }

    // Cargar encuesta y estadísticas en paralelo
    Promise.all([
      this.encuestasService.traerEncuesta(encuestaId, codigo, CodigoTipoEnum.RESULTADOS).toPromise(),
      this.encuestasService.obtenerEstadisticasEncuesta(encuestaId).toPromise()
    ]).then(([encuesta, estadisticas]) => {
      this.encuesta.set(encuesta!);
      this.estadisticas.set(estadisticas!);
      this.generarDatosGraficos();
      this.cargando.set(false);
    }).catch((error) => {
      console.error('Error al cargar resultados:', error);
      this.error.set('No se pudieron cargar los resultados. Verifique el código.');
      this.cargando.set(false);
    });
  }

  private extraerIdDelCodigo(codigo: string): number | null {
    try {
      // Implementa tu lógica para extraer el ID del código
      return parseInt(codigo.split('-')[1]) || null;
    } catch {
      return null;
    }
  }

  // ========== CONFIGURACIÓN DE GRÁFICOS ==========
  private configurarGraficos(): void {
    this.chartOptions.set({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              const value = context.parsed;
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    });
  }

  private generarDatosGraficos(): void {
    const stats = this.estadisticas();
    if (!stats) return;

    const chartData: any = {};

    stats.estadisticasPorPregunta.forEach((pregunta, index) => {
      if (pregunta.tipoPregunta !== TiposRespuestaEnum.ABIERTA && pregunta.estadisticasOpciones) {
        const labels = pregunta.estadisticasOpciones.map(op => op.textoOpcion);
        const data = pregunta.estadisticasOpciones.map(op => op.cantidadRespuestas);
        const backgroundColor = this.generarColores(labels.length);

        chartData[`pregunta_${pregunta.preguntaId}`] = {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: backgroundColor,
            borderColor: backgroundColor.map(color => color.replace('0.8', '1')),
            borderWidth: 2
          }]
        };
      }
    });

    this.chartData.set(chartData);
  }

  private generarColores(cantidad: number): string[] {
    const colores = [
      'rgba(59, 130, 246, 0.8)',   // blue
      'rgba(16, 185, 129, 0.8)',   // green  
      'rgba(245, 158, 11, 0.8)',   // yellow
      'rgba(239, 68, 68, 0.8)',    // red
      'rgba(139, 92, 246, 0.8)',   // purple
      'rgba(236, 72, 153, 0.8)',   // pink
      'rgba(14, 165, 233, 0.8)',   // sky
      'rgba(34, 197, 94, 0.8)',    // emerald
    ];
    
    return Array.from({ length: cantidad }, (_, i) => 
      colores[i % colores.length]
    );
  }

  // ========== MÉTODOS DE UTILIDAD ==========
  getPreguntaStats(preguntaId: number): EstadisticaPreguntaDTO | undefined {
    return this.estadisticas()?.estadisticasPorPregunta.find(p => p.preguntaId === preguntaId);
  }

  getChartDataForPregunta(preguntaId: number): any {
    return this.chartData()[`pregunta_${preguntaId}`];
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  calcularPorcentajeRespuestas(preguntaStats: EstadisticaPreguntaDTO): number {
    const totalEncuesta = this.estadisticas()?.totalRespuestas || 1;
    return (preguntaStats.totalRespuestas / totalEncuesta) * 100;
  }

  // ========== MÉTODOS DE NAVEGACIÓN ==========
  volverInicio(): void {
    this.router.navigate(['/']);
  }

  exportarResultados(): void {
    // Implementar exportación a PDF/Excel
    console.log('Exportar resultados - Por implementar');
  }

  compartirResultados(): void {
    // Implementar funcionalidad de compartir
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      // Mostrar mensaje de éxito
      console.log('URL copiada al portapapeles');
    });
  }
}