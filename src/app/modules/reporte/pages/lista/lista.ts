import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PlanResponseSummary, PlanPagedResponse } from '../../../planes/models/plan.model';
import { PlanesService } from '../../../planes/services/planes.service';

@Component({
  selector: 'app-reportes-planes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.html',
})
export class ReportesPlanesComponent implements OnInit {
  planes: PlanResponseSummary[] = [];
  loading = false;
  private planesService = inject(PlanesService);

  ngOnInit() {
    this.cargarPlanes();
  }

  cargarPlanes() {
    this.loading = true;
    // Puedes ajustar el statusPlan según el filtro que desees, aquí ejemplo con todos los estados
    this.planesService.getPaged('CREADO,REVISION,APROBAR,DEVOLVER').subscribe({
      next: (res) => {
        this.planes = res.content || [];
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  exportToExcel() {
    const data = this.planes.map(plan => ({
      Nombre: plan.name,
      Versión: plan.version,
      Período: `${plan.periodStart} - ${plan.periodEnd}`,
      'Estado Plan': plan.planStatus,
      Estado: plan.status,
      'Objetivos Institucionales': (plan.institutionalObjectives || [])
        .map(obj => `${obj.strategicObjective} / ${obj.pndObjective} / ${obj.odsObjective}`).join('; '),
      Programas: (plan.programs || []).map(p => p.name).join('; ')
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Planes');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'reporte-planes.xlsx');
  }

exportToPdf() {
  const doc = new jsPDF('l', 'pt');
  const columns = [
    { header: 'Nombre', dataKey: 'name' },
    { header: 'Versión', dataKey: 'version' },
    { header: 'Período', dataKey: 'period' },
    { header: 'Estado Plan', dataKey: 'planStatus' },
    { header: 'Estado', dataKey: 'status' },
    { header: 'Objetivos Institucionales', dataKey: 'objetivos' },
    { header: 'Programas', dataKey: 'programas' }
  ];
  // 👇 AQUÍ LA SOLUCIÓN: fuerza el tipo de cada fila
  const rows: Record<string, string>[] = this.planes.map(plan => ({
    name: plan.name,
    version: plan.version,
    period: `${plan.periodStart} - ${plan.periodEnd}`,
    planStatus: plan.planStatus,
    status: plan.status,
    objetivos: (plan.institutionalObjectives || [])
      .map(obj => `${obj.strategicObjective} / ${obj.pndObjective} / ${obj.odsObjective}`).join('; '),
    programas: (plan.programs || []).map(p => p.name).join('; ')
  }));

  doc.setFontSize(14);
  doc.text('Reporte de Planes', 40, 40);

  autoTable(doc, {
    head: [columns.map(c => c.header)],
    body: rows.map(row => columns.map(col => row[col.dataKey])),
    startY: 60,
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [13, 110, 253],
      textColor: 255,
      halign: 'center'
    },
    alternateRowStyles: {
      fillColor: [230, 244, 254]
    },
    theme: 'striped'
  });

  doc.save('reporte-planes.pdf');
}
}
