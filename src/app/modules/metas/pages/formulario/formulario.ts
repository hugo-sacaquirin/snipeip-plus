// src/app/modules/metas/pages/formulario/formulario.ts
import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoalRequest, GoalResponse } from '../../models/goal.model';

@Component({
  selector: 'app-formulario-meta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html'
})
export class FormularioMetaComponent {
  @Input() meta: GoalResponse | null = null;
  @Output() onSave = new EventEmitter<GoalRequest>();
  @Output() onCancel = new EventEmitter<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      period: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      unitOfMeasure: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      expectedValue: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      responsible: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      status: ['ACTIVO'],
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['meta']) {
      if (this.meta) this.form.patchValue(this.meta);
      else this.form.reset();
    }
  }
  save() {
    if (this.form.valid) this.onSave.emit(this.form.value);
  }
}
