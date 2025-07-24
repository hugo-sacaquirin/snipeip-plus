// src/app/shared/modals/modal-observacion.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-observacion-gestion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './observaciones.html'
})
export class ModalObservacionGestionPlanesComponent {
  @Input() title: string = 'Aprobar o Devolver plan';
  @Input() show: boolean = false;
  @Output() onSubmit = new EventEmitter<{ observacion: string, accion: string }>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      observacion: ['', [Validators.required, Validators.minLength(10)]],
      accion: ['APROBAR', Validators.required] // Valor por defecto: Aprobar
    });
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value); 
      this.form.reset({ accion: 'APROBAR' }); // Restaura select por defecto
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}
