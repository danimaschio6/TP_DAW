// src/app/components/texto-error/texto-error.component.ts
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- THIS IS VITAL FOR *ngIf

@Component({
  selector: 'app-texto-error',
  standalone: true, // <-- This tells Angular it's a standalone component
  imports: [CommonModule], // <-- *ngIf is provided by CommonModule
  templateUrl: './texto-error.component.html',
  styleUrl: './texto-error.component.css'
})
export class TextoErrorComponent {
  @Input() control!: AbstractControl | null;
  @Input() mensaje: string = 'Campo inválido';

  get showError(): boolean {
    // Show error ONLY if control exists AND is invalid AND has been interacted with
    return !!this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }
}