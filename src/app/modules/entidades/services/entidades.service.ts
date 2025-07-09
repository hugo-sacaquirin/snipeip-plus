import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityRequest, EntityPagedResponse, EntityResultResponse } from '../models/entity.model';

@Injectable({ providedIn: 'root' })
export class EntidadesService {
  private readonly API = 'http://localhost:8080/entities';

  constructor(private http: HttpClient) { }

  getPaged(page = 0, size = 20): Observable<EntityPagedResponse> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<EntityPagedResponse>(`${this.API}/paged`, { params });
  }
  getEntinesByFilter(page = 0, size = 20, tipo: number, filtro: string): Observable<EntityPagedResponse> {
    let params: any = {};
    if (filtro && filtro.trim().length > 0) {
      params = tipo === 0 ? { page: page, size: size, name: filtro, type: tipo } : { page: page, size: size, code: filtro, type: tipo };
    }
    return this.http.get<EntityPagedResponse>(`${this.API}/search`, { params });
  }

  create(entity: EntityRequest): Observable<EntityResultResponse> {
    return this.http.post<EntityResultResponse>(this.API, entity);
  }

  update(id: number, entity: EntityRequest): Observable<EntityResultResponse> {
    return this.http.put<EntityResultResponse>(`${this.API}/${id}`, entity);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}/delete`);
  }
}
