import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-encuesta-creada',
  standalone: true,
  imports: [ButtonModule, CardModule, ToastModule, HttpClientModule, CommonModule],
  providers: [MessageService],
  templateUrl: './encuesta-creada.component.html',
  styleUrl: './encuesta-creada.component.css'
})
export class EncuestaCreadaComponent implements OnInit {
  private datosEncuesta: any;
  urlRespuesta: string = '';
  urlResultados: string = '';
  urlRespuestaCorta: string = '';
  urlResultadosCorta: string = '';
  qrRespuesta: string = '';
  qrResultados: string = '';
  cargandoUrls: boolean = true;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    // Obtener los datos pasados por state
    const navigation = this.router.getCurrentNavigation();
    this.datosEncuesta = navigation?.extras?.state;
  }

  async ngOnInit() {
    if (!this.datosEncuesta) {
      console.error('No se recibieron datos de la encuesta');
      this.router.navigateByUrl('/');
    } else {
      console.log('Datos recibidos:', this.datosEncuesta);
      this.urlRespuesta = `http://localhost:4200/responder/${this.datosEncuesta.codigoRespuesta}`;
      this.urlResultados = `http://localhost:4200/resultados/${this.datosEncuesta.codigoResultados}`;
      
      try {
        console.log('Intentando acortar URLs...');
        await this.acortarUrls();
        console.log('URLs acortadas:', {
          respuesta: this.urlRespuestaCorta,
          resultados: this.urlResultadosCorta
        });
        console.log('Generando QRs...');
        await this.generarQRs();
        console.log('QRs generados correctamente');
      } catch (error) {
        console.error('Error:', error);
        this.mostrarError('No se pudieron acortar las URLs. Se mostrarán las URLs originales.');
        this.urlRespuestaCorta = this.urlRespuesta;
        this.urlResultadosCorta = this.urlResultados;
        await this.generarQRs();
      } finally {
        this.cargandoUrls = false;
      }
    }
  }

  private async acortarUrls() {
    try {
      const urlRespuestaCorta = await this.acortarUrl(this.urlRespuesta);
      const urlResultadosCorta = await this.acortarUrl(this.urlResultados);
      
      this.urlRespuestaCorta = urlRespuestaCorta;
      this.urlResultadosCorta = urlResultadosCorta;
    } catch (error) {
      throw new Error('Error al acortar URLs');
    }
  }

  private async acortarUrl(url: string): Promise<string> {
    try {
      const response = await this.http.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`).toPromise();
      return response as string;
    } catch (error) {
      throw new Error('Error al acortar URL');
    }
  }

  private async generarQRs() {
    try {
      this.qrRespuesta = await QRCode.toDataURL(this.urlRespuestaCorta);
      this.qrResultados = await QRCode.toDataURL(this.urlResultadosCorta);
    } catch (error) {
      this.mostrarError('Error al generar los códigos QR');
    }
  }

  irAPresentacionEnlaces() {
    if (this.datosEncuesta) {
      this.router.navigateByUrl(
        `/presentacion-enlaces?id-encuesta=${this.datosEncuesta.encuestaId}&codigo-respuesta=${this.datosEncuesta.codigoRespuesta}&codigo-resultados=${this.datosEncuesta.codigoResultados}`
      );
    }
  }

  copiarAlPortapapeles(texto: string) {
    navigator.clipboard.writeText(texto).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Copiado',
        detail: 'URL copiada al portapapeles'
      });
    });
  }

  descargarQR(url: string, nombre: string) {
    const link = document.createElement('a');
    link.download = `qr-${nombre}.png`;
    link.href = url;
    link.click();
  }

  private mostrarError(mensaje: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje
    });
  }

  crearNuevaEncuesta() {
    this.router.navigateByUrl('/crear-encuesta');
  }
}