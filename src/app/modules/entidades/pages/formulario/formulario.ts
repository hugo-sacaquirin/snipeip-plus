import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntityRequest, EntityResponse } from '../../models/entity.model';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html'
})
export class FormularioComponent {
  @Input() entidad: EntityResponse | null = null;
  @Output() onSave = new EventEmitter<EntityRequest>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      subSector: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      level: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      status: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entidad']) {
      if (this.entidad) this.form.patchValue(this.entidad);
      else this.form.reset();
    }
  }

  save() {
    if (this.form.valid) this.onSave.emit(this.form.value);
  }
}
