// src/app/modules/planes/pages/lista/lista.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { AlineacionesService } from '../../../alineaciones/services/alineaciones.service';
import { ProgramsService } from '../../../programas/services/programs.service';
import { FormularioPlanComponent } from '../../../planes/pages/formulario/formulario';
import { ModalObservacionComponent } from '../../../planes/pages/observacion/observacion';
import { PlanesService } from '../../../planes/services/planes.service';
import { PlanApprovalRequest, PlanRequest, PlanResponseSummary } from '../../../planes/models/plan.model';


@Component({
  selector: 'app-lista-planes',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioPlanComponent,ModalObservacionComponent],
  templateUrl: './lista.html'
})
export class ListaGestionPlanesComponent implements OnInit {
  private planesService = inject(PlanesService);
  private alineacionesService = inject(AlineacionesService);
  private programasService = inject(ProgramsService);
  
  alineaciones: any[] = [];
  programas: any[] = [];

  planes: PlanResponseSummary[] = [];
  showForm = false;
  selectedPlan: PlanResponseSummary | null = null;
  filtro: string = '';
  tipoBusqueda: number = 0; // 0 = nombre, 1 = versión
  statusFilter: string = 'CREADO'; // Puedes usar para filtrar por estado

  showObservacionModal = false;
  planToReview: any = null;
  observacionValue: string = '';

  openObservacionModal(plan: any) {
    this.planToReview = plan;
    this.showObservacionModal = true;
  }

  closeObservacionModal() {
    this.showObservacionModal = false;
    this.planToReview = null;
    this.observacionValue = '';
  }

confirmSendForReview(observacion: string) {
  if (!this.planToReview) return;

  const request: PlanApprovalRequest = {
    observations: observacion,
    status: 'EN REVISION'
  };

  this.planesService.sendForReview(this.planToReview.id, request)
    .subscribe({
      next: () => {
        this.load();
        this.closeObservacionModal();
      }
    });
}

  ngOnInit() {
    this.load();
    this.alineacionesService.getPaged().subscribe(res => this.alineaciones = res.content || res);
    this.programasService.getPaged().subscribe(res => this.programas = res.content || res);
  }

  searchPlans() {
    console.log(this.tipoBusqueda)
    if (this.tipoBusqueda == 0) {
      this.planesService.search(this.tipoBusqueda, this.filtro, this.statusFilter).subscribe(res => {
        this.planes = res.content;
      });
    } else if (this.tipoBusqueda == 1) {
      this.planesService.search(this.tipoBusqueda, this.filtro, this.statusFilter).subscribe(res => {
        this.planes = res.content;
      });
    } else {
      this.load();
    }
  }

  clean() {
    this.filtro = '';
    //this.statusFilter = '';
    this.load();
  }

  load() {
    this.planesService.getPaged(this.statusFilter).subscribe(res => {
      this.planes = res.content;
    });
  }

  openForm(plan?: any) {
    this.selectedPlan = plan || null;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.selectedPlan = null;
  }

  onSave(plan: PlanRequest) {
    if (plan.id) {
      this.planesService.update(plan.id, plan).subscribe(() => this.load());
    } else {
      this.planesService.create(plan).subscribe(() => this.load());
    }
    this.closeForm();
  }

  deletePlan(id: number) {
    this.planesService.delete(id).subscribe(() => this.load());
  }

  editPlan(plan: PlanResponseSummary) {
    this.openForm(plan);
  }

}
