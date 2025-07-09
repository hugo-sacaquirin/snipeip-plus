// src/app/modules/objetivos/pages/lista/lista.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjetivosService } from '../../services/objetivos.service';
import { ObjectiveResponse, ObjectiveRequest } from '../../models/objective.model';
import { FormularioObjetivoComponent } from '../formulario/formulario';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-lista-objetivos',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioObjetivoComponent],
  templateUrl: './lista.html'
})
export class ListaObjetivosComponent implements OnInit {
  private objetivosService = inject(ObjetivosService);

  objetivos: ObjectiveResponse[] = [];
  showForm = false;
  selectedObjetivo: ObjectiveResponse | null = null;
  filtro: string = '';
  tipoBusqueda: number = 0; // 0 = nombre, 1 = código

  ngOnInit() { this.load(); }

  getObjectivesByFilter() {
    this.objetivosService.getObjectivesByFilter(0, 20, this.tipoBusqueda, this.filtro)
      .subscribe(res => {
        this.objetivos = res.content;
      });
  }

  clean() {
    this.filtro = '';
    this.load();
  }

  load() {
    this.objetivosService.getPaged(0, 20).subscribe(res => {
      this.objetivos = res.content;
    });
  }

  openForm(objetivo?: ObjectiveResponse) {
    this.selectedObjetivo = objetivo || null;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.selectedObjetivo = null;
  }

  onSave(objetivo: ObjectiveRequest) {
    if (objetivo.id) {
      this.objetivosService.update(objetivo.id, objetivo).subscribe(() => this.load());
    } else {
      this.objetivosService.create(objetivo).subscribe(() => this.load());
    }
    this.closeForm();
  }

  deleteObjetivo(id: number) {
    this.objetivosService.delete(id).subscribe(() => this.load());
  }

  editObjetivo(objetivo: ObjectiveResponse) {
    this.openForm(objetivo);
  }
}
