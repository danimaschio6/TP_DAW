import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-seccion',
  imports: [],
  templateUrl: './seccion.component.html',
  styleUrl: './seccion.component.css'
})
export class SeccionComponent {

  texto = input<string>("hola");

  
  nombre: string = "Dani";
  saludo = signal<string>("adios")
}
