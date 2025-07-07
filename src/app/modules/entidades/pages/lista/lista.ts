import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntidadesService } from '../../services/entidades.service';
import { EntityResponse, EntityRequest } from '../../models/entity.model';
import { FormularioComponent } from '../formulario/formulario';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormularioComponent],
  templateUrl: './lista.html'
})
export class ListaComponent implements OnInit {
  private entidadesService = inject(EntidadesService);

  entidades: EntityResponse[] = [];
  page = 0;
  size = 10;
  totalPages = 1;
  showForm = false;
  selectedEntidad: EntityResponse | null = null;

  ngOnInit() { this.load(); }

  load() {
    this.entidadesService.getPaged(this.page, this.size).subscribe(res => {
      this.entidades = res.content;
      this.totalPages = res.totalPages || 1;
    });
  }
  openForm(entidad?: EntityResponse) {
    this.selectedEntidad = entidad || null;
    this.showForm = true;
  }
  closeForm() {
    this.showForm = false;
    this.selectedEntidad = null;
  }
  onSave(entidad: EntityRequest) {
    if (entidad.id) {
      this.entidadesService.update(entidad.id, entidad).subscribe(() => this.load());
    } else {
      this.entidadesService.create(entidad).subscribe(() => this.load());
    }
    this.closeForm();
  }
  deleteEntidad(id: number) {
    this.entidadesService.delete(id).subscribe(() => this.load());
  }
  editEntidad(entidad: EntityResponse) {
    this.openForm(entidad);
  }
}
