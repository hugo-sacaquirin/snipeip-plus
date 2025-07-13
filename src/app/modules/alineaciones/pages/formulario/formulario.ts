import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-alineacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html'
})
export class FormularioAlineacionComponent implements OnInit {
  @Input() objetivosEstrategicos: any[] = [];
  @Input() objetivosPND: any[] = [];
  @Input() objetivosODS: any[] = [];
  @Input() entidades: any[] = [];
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      strategicObjectiveId: [null, Validators.required],
      pndId: [null, Validators.required],
      odsId: [null, Validators.required],
      entityId: [null, Validators.required]
    });
  }

  ngOnInit() {}

  save() {
    if (this.form.valid) {
      this.loading = true;
      this.onSave.emit(this.form.value);
    }
  }
}
