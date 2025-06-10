import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-encuesta-creada',
  standalone: true,
  imports: [ButtonModule, CardModule],
  templateUrl: './encuesta-creada.component.html',
  styleUrl: './encuesta-creada.component.css'
})
export class EncuestaCreadaComponent implements OnInit {
  private datosEncuesta: any;

  constructor(private router: Router) {
    // Obtener los datos pasados por state
    const navigation = this.router.getCurrentNavigation();
    this.datosEncuesta = navigation?.extras?.state;
  }

  ngOnInit() {
    // Si no hay datos, redirigir al inicio
    if (!this.datosEncuesta) {
      this.router.navigateByUrl('/');
    }
  }

  irAPresentacionEnlaces() {
    if (this.datosEncuesta) {
      this.router.navigateByUrl(
        `/presentacion-enlaces?id-encuesta=${this.datosEncuesta.encuestaId}&codigo-respuesta=${this.datosEncuesta.codigoRespuesta}&codigo-resultados=${this.datosEncuesta.codigoResultados}`
      );
    }
  }

  crearNuevaEncuesta() {
    this.router.navigateByUrl('/crear-encuesta');
  }
}