// src/app/modules/programas/services/programs.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramRequest, ProgramPagedResponse, ProgramResponse } from '../models/program.model';

@Injectable({ providedIn: 'root' })
export class ProgramsService {
  private readonly API = 'http://localhost:8084/programs';

  constructor(private http: HttpClient) {}

  getPaged(): Observable<ProgramPagedResponse> {
    return this.http.get<ProgramPagedResponse>(`${this.API}/paged`);
  }

  search(name?: string, responsible?: string): Observable<ProgramPagedResponse> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (responsible) params = params.set('responsible', responsible);
    return this.http.get<ProgramPagedResponse>(`${this.API}/search`, { params });
  }

  create(data: ProgramRequest): Observable<any> {
    return this.http.post(`${this.API}`, data);
  }

  update(id: number, data: ProgramRequest): Observable<any> {
    return this.http.put(`${this.API}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
