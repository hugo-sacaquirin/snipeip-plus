import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlineacionesService } from '../../services/alineaciones.service';
import { EntidadesService } from '../../../entidades/services/entidades.service';
import { ObjetivosService } from '../../../objetivos/services/objetivos.service';

@Component({
  selector: 'app-formulario-alineacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html'
})
export class FormularioAlineacionComponent implements OnInit {
  form: FormGroup;
  loading = false;
  message = '';

  // Listas para selects
  objetivosEstrategicos: any[] = [];
  objetivosPND: any[] = [];
  objetivosODS: any[] = [];
  entidades: any[] = [];

  constructor(
    private fb: FormBuilder,
    private alineacionesService: AlineacionesService,
    private entidadesService: EntidadesService,
    private objectivesService: ObjetivosService // Necesitas crearlo si no existe
  ) {
    this.form = this.fb.group({
      strategicObjectiveId: [null, Validators.required],
      pndId: [null, Validators.required],
      odsId: [null, Validators.required],
      entityId: [null, Validators.required],
    });
  }

  ngOnInit() {
    // Consulta todos los combos (usa tus servicios)
    this.objectivesService.getObjectivesByFilter(0, 20, 1, 'ESTRATEGICOS').subscribe(res => this.objetivosEstrategicos = res.content);
    this.objectivesService.getObjectivesByFilter(0, 20, 1, 'PDN').subscribe(res => this.objetivosPND = res.content);
    this.objectivesService.getObjectivesByFilter(0, 20, 1, 'ODS').subscribe(res => this.objetivosODS = res.content);
    this.entidadesService.getPaged(0, 50).subscribe(res => this.entidades = res.content);
  }

  submit() {
    if (this.form.invalid) {
      this.message = 'Completa todos los campos.';
      return;
    }
    this.loading = true;
    this.message = '';
    this.alineacionesService.createAlineacion(this.form.value).subscribe({
      next: res => {
        this.message = '¡Alineación guardada exitosamente!';
        this.form.reset();
        this.loading = false;
      },
      error: err => {
        this.message = 'Error: ' + (err?.error?.result || 'No se pudo guardar');
        this.loading = false;
      }
    });
  }
}
