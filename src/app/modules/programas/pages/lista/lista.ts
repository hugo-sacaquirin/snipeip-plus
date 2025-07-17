// src/app/modules/programas/pages/lista/lista.ts
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsService } from '../../services/programs.service';
import { ProgramResponse, ProgramRequest } from '../../models/program.model';
import { FormularioProgramaComponent } from '../formulario/formulario';
import { FormsModule } from '@angular/forms';
import { ProyectosService } from '../../../proyectos/services/proyectos.service';
import { ProjectSummary } from '../../models/program.model';

@Component({
  selector: 'app-lista-programas',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioProgramaComponent],
  templateUrl: './lista.html'
})
export class ListaProgramasComponent implements OnInit {
  private programsService = inject(ProgramsService);
  private projectsService = inject(ProyectosService);

  programas: ProgramResponse[] = [];
  proyectos: ProjectSummary[] = [];
  showForm = false;
  selectedPrograma: ProgramResponse | null = null;
  filtro: string = '';
  tipoBusqueda: number = 0; // 0 = nombre, 1 = responsable


  ngOnInit() {
    this.load();
    this.projectsService.getPaged().subscribe(res => {
      this.proyectos = res.content; // Ajusta si tu servicio devuelve otro formato
    });
  }

  searchPrograms() {
    if (this.tipoBusqueda === 0 && this.filtro) {
      this.programsService.search(this.filtro).subscribe(res => {
        this.programas = res.content;
      });
    } else if (this.tipoBusqueda === 1 && this.filtro) {
      this.programsService.search(undefined, this.filtro).subscribe(res => {
        this.programas = res.content;
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
    this.programsService.getPaged().subscribe(res => {
      this.programas = res.content;
    });
  }

  openForm(programa?: ProgramResponse) {
    this.selectedPrograma = programa || null;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.selectedPrograma = null;
  }

  onSave(programa: ProgramRequest) {
    if (programa.id) {
      this.programsService.update(programa.id, programa).subscribe(() => this.load());
    } else {
      this.programsService.create(programa).subscribe(() => this.load());
    }
    this.closeForm();
  }

  deletePrograma(id: number) {
    this.programsService.delete(id).subscribe(() => this.load());
  }

  editPrograma(programa: ProgramResponse) {
    this.openForm(programa);
  }
}
