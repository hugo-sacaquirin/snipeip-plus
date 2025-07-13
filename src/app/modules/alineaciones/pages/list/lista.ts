import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormularioAlineacionComponent } from '../formulario/formulario';
import { AlineacionesService } from '../../services/alineaciones.service';
import { ObjetivosService } from '../../../objetivos/services/objetivos.service';
import { EntidadesService } from '../../../entidades/services/entidades.service';

@Component({
  selector: 'app-lista-alineaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioAlineacionComponent],
  templateUrl: './lista.html'
})
export class ListaAlineacionesComponent implements OnInit {
  private alineacionesService = inject(AlineacionesService);
  private objetivosService = inject(ObjetivosService);
  private entidadesService = inject(EntidadesService);

  alineaciones: any[] = [];
  objetivosEstrategicos: any[] = [];
  objetivosPND: any[] = [];
  objetivosODS: any[] = [];
  entidades: any[] = [];
  filtro: string = '';
  tipoBusqueda: number = 0;
  showForm = false;

  ngOnInit() {
    this.load();
    this.loadCombos();
  }

  load() {
    this.alineacionesService.getPaged().subscribe(res => {
      this.alineaciones = res.content;
    });
  }
  loadCombos() {
    this.objetivosService.getObjectivesByFilter(0, 20, 1, 'ESTRATEGICOS').subscribe(res => this.objetivosEstrategicos = res.content);
    this.objetivosService.getObjectivesByFilter(0, 20, 1, 'PDN').subscribe(res => this.objetivosPND = res.content);
    this.objetivosService.getObjectivesByFilter(0, 20, 1, 'ODS').subscribe(res => this.objetivosODS = res.content);
    this.entidadesService.getPaged(0, 50).subscribe(res => this.entidades = res.content);
  }

  getAlignmentsByFilter() {
    this.alineacionesService.search(0, 20, this.tipoBusqueda, this.filtro)
      .subscribe(res => {
        this.alineaciones = res.content;
      });
  }

  clean() {
    this.filtro = '';
    this.load();
  }

  openForm() {
    this.showForm = true;
  }
  closeForm() {
    this.showForm = false;
  }

  onSave(alineacion: any) {
    this.alineacionesService.createAlineacion(alineacion).subscribe(() => this.load());
    this.closeForm();
  }

  deleteAlignment(id: number) {
    if (confirm('¿Está seguro de eliminar esta alineación?')) {
      this.alineacionesService.deactivate(id).subscribe(() => this.load());
    }
  }
}
