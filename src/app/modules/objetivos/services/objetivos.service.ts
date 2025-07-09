// src/app/modules/objetivos/services/objetivos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObjectiveRequest, ObjectiveResponse, ObjectiveResultResponse, ObjectivePagedResponse } from '../models/objective.model';

@Injectable({ providedIn: 'root' })
export class ObjetivosService {
    private readonly API = 'http://localhost:8081/objectives';

    constructor(private http: HttpClient) { }

    getPaged(page = 0, size = 20, filtro: string = '', tipo: number = 0): Observable<ObjectivePagedResponse> {
        let params = new HttpParams().set('page', page).set('size', size);
        if (filtro) {
            params = tipo === 0
                ? params.set('name', filtro)
                : params.set('code', filtro);
        }
        return this.http.get<ObjectivePagedResponse>(`${this.API}/paged`, { params });
    }

    getObjectivesByFilter(page = 0, size = 20, tipo: number, filtro: string): Observable<ObjectivePagedResponse> {
        let params: any = { page, size };
        if (filtro && filtro.trim().length > 0) {
            //params = tipo === 0 ? { ...params, name: filtro, type } : { ...params, code: filtro, type };
            params = tipo === 0 ? { page: page, size: size, name: filtro, type: tipo } : { page: page, size: size, typeObjective: filtro, type: tipo };
        }
        return this.http.get<ObjectivePagedResponse>(`${this.API}/search`, { params });
    }

    create(objective: ObjectiveRequest): Observable<ObjectiveResultResponse> {
        return this.http.post<ObjectiveResultResponse>(this.API, objective);
    }

    update(id: number, objective: ObjectiveRequest): Observable<ObjectiveResultResponse> {
        return this.http.put<ObjectiveResultResponse>(`${this.API}/${id}`, objective);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API}/${id}/deactivate`);
    }
}
