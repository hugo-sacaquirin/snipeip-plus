// src/app/modules/objetivos/pages/formulario/formulario.ts
import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectiveRequest, ObjectiveResponse } from '../../models/objective.model';

@Component({
  selector: 'app-formulario-objetivo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html'
})
export class FormularioObjetivoComponent {
  @Input() objetivo: ObjectiveResponse | null = null;
  @Output() onSave = new EventEmitter<ObjectiveRequest>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      eje: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      status: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['objetivo']) {
      if (this.objetivo) this.form.patchValue(this.objetivo);
      else this.form.reset();
    }
  }

  save() {
    if (this.form.valid) this.onSave.emit(this.form.value);
  }
}
