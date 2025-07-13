import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlineacionRequest, AlineacionResultResponse, ObjectiveAlignmentPagedResponse } from '../models/alineacion.model';

@Injectable({ providedIn: 'root' })
export class AlineacionesService {
  private readonly API = 'http://localhost:8081/objective-alignments';

  constructor(private http: HttpClient) { }

  createAlineacion(req: AlineacionRequest): Observable<AlineacionResultResponse> {
    return this.http.post<AlineacionResultResponse>(this.API, req);
  }
  getPaged(page = 0, size = 20): Observable<ObjectiveAlignmentPagedResponse> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ObjectiveAlignmentPagedResponse>(`${this.API}/paged`, { params });
  }

  search(page = 0, size = 20, tipo: number, filtro: string): Observable<ObjectiveAlignmentPagedResponse> {
    let params: any;
    if (filtro && filtro.trim().length > 0) {
      if (tipo == 0) {
        params = { page: page, size: size, typeObjective: filtro, type: tipo }
      } else {
        params = { page: page, size: size, entityName: filtro, type: tipo };
      }
    }
    return this.http.get<ObjectiveAlignmentPagedResponse>(`${this.API}/search`, { params });
  }

  deactivate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}/deactivate`);
  }
}
