// src/app/modules/proyectos/services/proyectos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectRequest, ProjectPagedResponse, ProjectResponse } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProyectosService {
  private readonly API = 'http://localhost:8083/projects';

  constructor(private http: HttpClient) {}

  getPaged(): Observable<ProjectPagedResponse> {
    return this.http.get<ProjectPagedResponse>(`${this.API}/paged`);
  }

  search(name?: string, code?: string): Observable<ProjectPagedResponse> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (code) params = params.set('code', code);
    return this.http.get<ProjectPagedResponse>(`${this.API}/search`, { params });
  }

  create(data: ProjectRequest): Observable<any> {
    return this.http.post(`${this.API}`, data);
  }

  update(id: number, data: ProjectRequest): Observable<any> {
    return this.http.put(`${this.API}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
