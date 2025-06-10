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
import { CalendarModule } from 'primeng/calendar'; 
import { FormsModule } from '@angular/forms'; 

import { EncuestasService } from '../../services/encuestas.service';
import { RespuestasService } from '../../services/respuestas.service';
import { EncuestaDTO } from '../../interfaces/encuesta.dto';
import { RespuestaDTO } from '../../interfaces/respuesta.dto';



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
    DividerModule,
    CalendarModule,
    FormsModule,
  ],
  providers: [MessageService],
  templateUrl: './lista-respuestas.component.html',
  styleUrl: './lista-respuestas.component.css'
})

export class ListaRespuestasComponent implements OnInit {
  encuesta = signal<EncuestaDTO | null>(null);
  respuestas = signal<RespuestaDTO[]>([]);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  respuestasFiltradas = signal<RespuestaDTO[]>([]);
  fechaInicioFiltro: Date | null = null;
  fechaFinFiltro: Date | null = null;
  filtroAplicado = signal<boolean>(false);


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private encuestasService = inject(EncuestasService);
  private respuestasService = inject(RespuestasService);
  private messageService = inject(MessageService);
  

  ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');
  


    if (codigo) {
      this.cargarEncuestaYRespuestas(codigo);
    } else {
      console.error('No se encontró código en la ruta');
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
    this.filtroAplicado.set(false)


    // OPCIÓN 1: Usar el método original (puede fallar)
    this.encuestasService.obtenerEncuestaPorCodigoResultados(codigo).subscribe({
      next: (encuesta) => {
       
        this.encuesta.set(encuesta);
       
        // Verificar que tenemos un ID válido
        if (!encuesta.id) {
          console.error('La encuesta no tiene ID válido');
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
      this.respuestasService.obtenerRespuestasPorEncuesta(encuestaId).subscribe({
      next: (respuestas) => {
       
        this.respuestas.set(respuestas);
        this.respuestasFiltradas.set(respuestas);
        this.cargando.set(false);
       

        this.mostrarEstadisticas(respuestas);
      },
      error: (error) => {
        console.error('Detalles del error de respuestas:', {
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
   

    const idPrueba = 1; 
   
    this.encuestasService.obtenerEncuestaConCodigo(idPrueba, codigo).subscribe({
      next: (encuesta) => {
        this.encuesta.set(encuesta);
        this.cargarRespuestasDeEncuesta(encuesta.id!);
      },
      error: (error) => {
        console.error('Fallback también falló:', error);
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


  
   // --- Nueva función para filtrar respuestas por fecha ---
  filtrarRespuestasPorFecha(): void {
    if (!this.fechaInicioFiltro && !this.fechaFinFiltro) {
      this.respuestasFiltradas.set(this.respuestas()); // Si no hay fechas, mostrar todas
      this.filtroAplicado.set(false);
      this.messageService.add({
        severity: 'info',
        summary: 'Información',
        detail: 'No se han seleccionado fechas para filtrar. Mostrando todas las respuestas.',
      });
      return;
    }

    this.filtroAplicado.set(true);
    const fechaInicio = this.fechaInicioFiltro ? new Date(this.fechaInicioFiltro) : null;
    const fechaFin = this.fechaFinFiltro ? new Date(this.fechaFinFiltro) : null;

    // Ajustar la hora final para incluir todo el día
    if (fechaFin) {
      fechaFin.setHours(23, 59, 59, 999);
    }

    const respuestasFiltradas = this.respuestas().filter((respuesta) => {
      const fechaRespuesta = new Date(respuesta.fechaCreacion);

      const cumpleFechaInicio = fechaInicio ? fechaRespuesta >= fechaInicio : true;
      const cumpleFechaFin = fechaFin ? fechaRespuesta <= fechaFin : true;

      return cumpleFechaInicio && cumpleFechaFin;
    });

    this.respuestasFiltradas.set(respuestasFiltradas);
    this.messageService.add({
      severity: 'success',
      summary: 'Filtrado',
      detail: `Se encontraron ${respuestasFiltradas.length} respuestas.`,
    });
  }

  // Nueva función para limpiar el filtro
  limpiarFiltro(): void {
    this.fechaInicioFiltro = null;
    this.fechaFinFiltro = null;
    this.respuestasFiltradas.set(this.respuestas()); // Mostrar todas las respuestas
    this.filtroAplicado.set(false);
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: 'Filtro de fechas limpiado. Mostrando todas las respuestas.',
    });
  }


  verDetalleRespuesta(respuestaId: number): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    console.log('🔍 Navegando al detalle de respuesta:', { codigo, respuestaId });
    this.router.navigate(['/detalle-respuesta', codigo, respuestaId]);
  }


  verEstadisticas(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
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













