// src/app/modules/proyectos/pages/lista/lista.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosService } from '../../services/proyectos.service';
import { ProjectResponse, ProjectRequest, GoalResponse } from '../../models/project.model';
import { FormularioProyectoComponent } from '../formulario/formulario';
import { FormsModule } from '@angular/forms'; 
import { GoalsService } from '../../../metas/services/goals.service';


@Component({
  selector: 'app-lista-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioProyectoComponent],
  templateUrl: './lista.html'
})
export class ListaProyectosComponent implements OnInit {
  private proyectosService = inject(ProyectosService);
  private metasService = inject(GoalsService);

  proyectos: ProjectResponse[] = [];
  showForm = false;
  selectedProyecto: ProjectResponse | null = null;
  filtro: string = '';
  tipoBusqueda: number = 0; // 0 = nombre, 1 = código
  allGoals: GoalResponse[] = [];

  ngOnInit() {
    this.load();
    this.metasService.getPaged().subscribe(res => {
      this.allGoals = res.content; // Ajusta si tu servicio devuelve otro formato
    });
  }

  searchProjects() {
    if (this.tipoBusqueda === 0 && this.filtro) {
      this.proyectosService.search(this.filtro).subscribe(res => {
        this.proyectos = res.content;
      });
    } else if (this.tipoBusqueda === 1 && this.filtro) {
      this.proyectosService.search(undefined, this.filtro).subscribe(res => {
        this.proyectos = res.content;
      });
    } else {
      this.load();
    }
  }

  clean() {
    this.filtro = '';
    this.load();
  }

  load() {
    this.proyectosService.getPaged().subscribe(res => {
      this.proyectos = res.content;
    });
  }

  openForm(proyecto?: ProjectResponse) {
    this.selectedProyecto = proyecto || null;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.selectedProyecto = null;
  }

  onSave(proyecto: ProjectRequest) {
    if (proyecto.id) {
      this.proyectosService.update(proyecto.id, proyecto).subscribe(() => this.load());
    } else {
      this.proyectosService.create(proyecto).subscribe(() => this.load());
    }
    this.closeForm();
  }

  deleteProyecto(id: number) {
    this.proyectosService.delete(id).subscribe(() => this.load());
  }

  editProyecto(proyecto: ProjectResponse) {
    this.openForm(proyecto);
  }
}
