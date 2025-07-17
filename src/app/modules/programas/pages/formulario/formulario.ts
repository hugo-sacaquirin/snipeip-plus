import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgramRequest, ProgramResponse, ProjectSummary } from '../../models/program.model';

@Component({
  selector: 'app-formulario-programa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html'
})
export class FormularioProgramaComponent implements OnInit {
  @Input() programa: ProgramResponse | null = null;
  @Input() proyectos: ProjectSummary[] = [];
  @Output() onSave = new EventEmitter<ProgramRequest>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      scope: [''],
      responsible: ['', [Validators.required, Validators.minLength(3)]],
      status: ['ACTIVO', Validators.required],
      projectIds: [[]]
    });
  }

  ngOnInit() {
    if (this.programa) this.form.patchValue({ ...this.programa, projectIds: this.programa.projects.map(p => p.id) });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['programa'] && this.programa) {
      this.form.patchValue({ ...this.programa, projectIds: this.programa.projects.map(p => p.id) });
    }
  }

  save() {
    if (this.form.valid) {
      this.onSave.emit(this.form.value);
    }
  }
}
