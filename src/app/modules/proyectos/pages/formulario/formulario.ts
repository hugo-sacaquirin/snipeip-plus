// src/app/modules/proyectos/pages/formulario/formulario.ts
import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectRequest, ProjectResponse, GoalResponse } from '../../models/project.model';

@Component({
  selector: 'app-formulario-proyecto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html'
})
export class FormularioProyectoComponent {
  @Input() proyecto: ProjectResponse | null = null;
  @Input() allGoals: GoalResponse[] = [];
  @Output() onSave = new EventEmitter<ProjectRequest>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      projectType: ['', Validators.required],
      executionPeriod: ['', Validators.required],
      estimatedBudget: [0, Validators.required],
      geographicLocation: ['', Validators.required],
      status: ['', Validators.required],
      goalIds: [[]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['proyecto']) {
      if (this.proyecto) {
        this.form.patchValue({
          ...this.proyecto,
          goalIds: this.proyecto.goals?.map(g => g.id) || [],
        });
      } else {
        this.form.reset();
        this.form.controls['goalIds'].setValue([]);
      }
    }
  }

  save() {
    if (this.form.valid) this.onSave.emit(this.form.value);
  }
}
