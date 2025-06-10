import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-texto-error',
  imports: [],
  templateUrl: './texto-error.component.html',
  styleUrl: './texto-error.component.css'
})
export class TextoErrorComponent {
  @Input() control!: AbstractControl | null; 
}
