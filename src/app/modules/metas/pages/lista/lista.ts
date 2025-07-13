// src/app/modules/metas/pages/lista/lista.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsService } from '../../services/goals.service';
import { GoalResponse, GoalRequest } from '../../models/goal.model';
import { FormularioMetaComponent } from '../formulario/formulario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-metas',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioMetaComponent],
  templateUrl: './lista.html'
})
export class ListaMetasComponent implements OnInit {
  private metasService = inject(GoalsService);

  metas: GoalResponse[] = [];
  showForm = false;
  selectedMeta: GoalResponse | null = null;

  tipoBusqueda: number = 0; // 0 = nombre, 1 = responsable
  filtro: string = '';

  ngOnInit() { this.load(); }

  getGoalsByFilter() {

    this.metasService.search(0, 20, this.tipoBusqueda, this.filtro).subscribe(res => {
      this.metas = res.content;
    });

  }

  clean() {
    this.filtro = '';
    this.load();
  }
  load() {
    this.metasService.getPaged(0, 20).subscribe(res => {
      this.metas = res.content;
    });
  }
  openForm(meta?: GoalResponse) {
    this.selectedMeta = meta || null;
    this.showForm = true;
  }
  closeForm() {
    this.showForm = false;
    this.selectedMeta = null;
  }
  onSave(meta: GoalRequest) {
    if (meta.id) {
      this.metasService.update(meta.id, meta).subscribe(() => this.load());
    } else {
      this.metasService.create(meta).subscribe(() => this.load());
    }
    this.closeForm();
  }
  deleteMeta(id: number) {
    this.metasService.delete(id).subscribe(() => this.load());
  }
  editMeta(meta: GoalResponse) {
    this.openForm(meta);
  }
}
