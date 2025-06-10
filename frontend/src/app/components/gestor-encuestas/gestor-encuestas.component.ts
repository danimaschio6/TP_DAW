// src/app/components/gestor-encuestas/gestor-encuestas.component.ts

import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasService } from '../../services/encuestas.service'; // Asegúrate que la ruta sea correcta
import { Encuesta } from '../../interfaces/encuesta'; // Asegúrate que la ruta sea correcta
import { finalize } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';

// PrimeNG imports
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
// Si usas p-inputSwitch, pero tu HTML usa un toggle custom, este módulo no es estrictamente necesario para el HTML que enviaste
// Si en el futuro cambias a p-inputSwitch, asegúrate de importarlo.
// import { InputSwitchModule } from 'primeng/inputswitch';


// Interfaz extendida para manejar estados de UI específicos de cada tarjeta de encuesta
interface EncuestaConEstadoUI extends Encuesta {
  isUpdating?: boolean; // Indica si la encuesta está en proceso de actualización (ej. toggle)
  updateError?: boolean; // Indica si hubo un error al actualizar el estado de la encuesta
}

@Component({
  selector: 'app-gestor-encuestas',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    CardModule,
    ButtonModule,
    RouterModule, // Necesario para que `Router` funcione en componentes standalone
    TagModule,
    DividerModule,
    PanelModule,
    // InputSwitchModule // Descomenta si vuelves a usar p-inputSwitch en el HTML
  ],
  templateUrl: './gestor-encuestas.component.html',
  styleUrls: ['./gestor-encuestas.component.css']
})
export class GestorEncuestasComponent implements OnInit {
  // Uso de Signals para la lista de encuestas y el estado de carga/error
  encuestas: WritableSignal<EncuestaConEstadoUI[]> = signal([]);
  cargando: WritableSignal<boolean> = signal(true);
  error: WritableSignal<string | null> = signal(null);

  constructor(
    private encuestasService: EncuestasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarEncuestas();
  }

  /**
   * Carga todas las encuestas desde el backend usando el servicio.
   * Actualiza los estados de carga y error usando signals.
   */
  cargarEncuestas(): void {
    this.cargando.set(true); // Establece el estado de carga a true
    this.error.set(null); // Limpia cualquier mensaje de error anterior

    this.encuestasService.getAllEncuestas().subscribe({
      next: (data) => {
        // Mapea los datos recibidos para añadir las propiedades de UI iniciales
        // Usa .set() para actualizar la señal de encuestas
        this.encuestas.set(data.map(e => ({ ...e, isUpdating: false, updateError: false })));
        this.cargando.set(false); // Finaliza el estado de carga
      },
      error: (err: any) => {
        console.error('Error al cargar las encuestas para gestión:', err);
        this.error.set('No se pudieron cargar las encuestas. Por favor, intenta de nuevo más tarde.');
        this.cargando.set(false); // Finaliza el estado de carga con error
      }
    });
  }

  /**
   * Maneja el evento de cambio del toggle switch para habilitar/deshabilitar una encuesta.
   * Actualiza el estado en el backend y luego en la lista de encuestas del frontend.
   * @param encuestaId El ID numérico de la encuesta cuyo estado se va a cambiar.
   * @param event El objeto Event del DOM (del input type="checkbox").
   */
  onToggleEncuestaEstado(encuestaId: number, event: Event): void { // <--- ¡Asegúrate que esta es la firma!
    const target = event.target as HTMLInputElement; // Casteo seguro a HTMLInputElement
    const nuevoEstado = target.checked; // Acceder a la propiedad 'checked'

    // Buscar la encuesta en el array de señales
    const encuestaIndex = this.encuestas().findIndex(e => e.id === encuestaId);
    if (encuestaIndex === -1) {
      console.error('Encuesta no encontrada en el array local:', encuestaId);
      return;
    }

    // Actualizar el estado de UI 'isUpdating' de la encuesta de forma inmutable
    this.encuestas.update(encs => {
      const newEncs = [...encs]; // Crea una nueva copia del array
      if (newEncs[encuestaIndex]) {
        // Crea una nueva copia del objeto de la encuesta para mutar sus propiedades de UI
        newEncs[encuestaIndex] = { ...newEncs[encuestaIndex], isUpdating: true, updateError: false };
      }
      return newEncs; // Devuelve el nuevo array a la señal
    });

    this.encuestasService.updateEncuestaEstado(encuestaId, nuevoEstado)
      .pipe(
        finalize(() => {
          // Después de que la petición HTTP se complete (éxito o error),
          // desactiva el estado 'isUpdating' para la encuesta.
          this.encuestas.update(encs => {
            const newEncs = [...encs];
            if (newEncs[encuestaIndex]) { // Verifica que aún existe
              newEncs[encuestaIndex] = { ...newEncs[encuestaIndex], isUpdating: false };
            }
            return newEncs;
          });
        })
      )
      .subscribe({
        next: (encuestaActualizada) => {
          // Actualiza la señal de encuestas con los datos recibidos del backend.
          // Esto asegura que cualquier cambio hecho por el backend (más allá de 'habilitada')
          // se refleje en la UI, manteniendo 'isUpdating' y 'updateError' en el estado correcto.
          this.encuestas.update(encs => {
            const newEncs = [...encs];
            if (newEncs[encuestaIndex]) {
              Object.assign(newEncs[encuestaIndex], {
                  ...encuestaActualizada, // Fusiona los datos actualizados
                  isUpdating: false,      // Asegura que isUpdating sea false
                  updateError: false      // Asegura que no haya error
              });
            }
            return newEncs;
          });
          console.log(`Estado de encuesta ${encuestaId} actualizado a: ${nuevoEstado}`);
        },
        error: (err: any) => {
          console.error(`Error al actualizar el estado de la encuesta ${encuestaId}:`, err);
          // Si hay un error, marca la encuesta con 'updateError' y revierte el estado en la UI.
          this.encuestas.update(encs => {
            const newEncs = [...encs];
            if (newEncs[encuestaIndex]) {
              newEncs[encuestaIndex] = { ...newEncs[encuestaIndex], updateError: true, habilitada: !nuevoEstado }; // Revertir el estado
            }
            return newEncs;
          });
          alert('Hubo un error al actualizar el estado de la encuesta. Por favor, intenta de nuevo.');
        }
      });
  }

  /**
   * Navega a la vista de resultados detallados de una encuesta.
   * Utiliza el Router de Angular.
   * @param codigoResultados El código de resultados de la encuesta.
   */
  verResultadosDetallados(codigoResultados: string): void {
    this.router.navigate(['/resultados', codigoResultados]);
    console.log(`Navegando a: /resultados/${codigoResultados}`);
  }
}
