// src/app/modules/planes/services/planes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PlanRequest, PlanPagedResponse, PlanResponseSummary, PlanApprovalRequest
} from '../models/plan.model';

@Injectable({ providedIn: 'root' })
export class PlanesService {
  private readonly API = 'http://localhost:8085/plans';

  constructor(private http: HttpClient) { }

  getPaged(statusPlan?: string): Observable<PlanPagedResponse> {
    let params = new HttpParams();
    if (statusPlan) params = params.set('statusPlan', statusPlan);
    return this.http.get<PlanPagedResponse>(`${this.API}/paged`, { params });
  }

  search(tipo: number, filtro: string, statusPlan: string): Observable<PlanPagedResponse> {
    let params: any;
    if (filtro && filtro.trim().length > 0) {
      if (tipo == 0) {
        params = { name: filtro, type: tipo, statusPlan: statusPlan }
      } else {
        params = { version: filtro, type: tipo, statusPlan: statusPlan };
      }
    }
    return this.http.get<PlanPagedResponse>(`${this.API}/search`, { params });
  }

  create(data: PlanRequest): Observable<any> {
    return this.http.post(`${this.API}`, data);
  }

  update(id: number, data: PlanRequest): Observable<any> {
    return this.http.put(`${this.API}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  sendForReview(id: number, data: PlanApprovalRequest): Observable<any> {
    return this.http.post(`${this.API}/${id}/send-review`, data || {});
  }

  approve(id: number, data?: PlanApprovalRequest): Observable<any> {
    return this.http.post(`${this.API}/${id}/approve`, data || {});
  }
}
