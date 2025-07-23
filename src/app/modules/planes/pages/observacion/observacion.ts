// src/app/shared/modals/modal-observacion.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-observacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './observacion.html'
})
export class ModalObservacionComponent {
  @Input() title: string = 'Enviar a Revisión';
  @Input() show: boolean = false;
  @Output() onSubmit = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      observacion: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value.observacion); 
      this.form.reset();
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}
