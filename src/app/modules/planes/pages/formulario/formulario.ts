import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html'
})
export class FormularioPlanComponent implements OnInit {
  @Input() plan: any = null;
  @Input() alineaciones: any[] = [];
  @Input() programas: any[] = [];
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3)]],
      version: ['', [Validators.required]],
      periodStart: ['', Validators.required],
      periodEnd: ['', Validators.required],
      planStatus: ['CREADO', Validators.required],
      status: ['ACTIVO', Validators.required],
      institutionalObjectiveAlignmentIds: [[]],
      programIds: [[]],
    });
  }

  ngOnInit() {
    if (this.plan) {
      this.form.patchValue({
        ...this.plan,
        institutionalObjectiveAlignmentIds: this.plan.institutionalObjectives?.map((o: any) => o.id) || [],
        programIds: this.plan.programs?.map((p: any) => p.id) || []
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['plan'] && this.plan) {
      this.form.patchValue({
        ...this.plan,
        institutionalObjectiveAlignmentIds: this.plan.institutionalObjectives?.map((o: any) => o.id) || [],
        programIds: this.plan.programs?.map((p: any) => p.id) || []
      });
    }
  }

  save() {
    if (this.form.valid) this.onSave.emit(this.form.value);
  }
}
