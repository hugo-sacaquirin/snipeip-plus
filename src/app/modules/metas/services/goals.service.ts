// src/app/modules/metas/services/goals.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoalRequest, GoalPagedResponse, GoalResultResponse } from '../models/goal.model';

@Injectable({ providedIn: 'root' })
export class GoalsService {
    private readonly API = 'http://localhost:8082/goals';

    constructor(private http: HttpClient) { }

    getPaged(page = 0, size = 20): Observable<GoalPagedResponse> {
        const params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<GoalPagedResponse>(`${this.API}/paged`, { params });
    }

    search(page = 0, size = 20, tipo: number, filtro: string): Observable<GoalPagedResponse> {
        let params: any;
        if (filtro && filtro.trim().length > 0) {
            if (tipo == 0) {
                params = { page: page, size: size, name: filtro, type: tipo }
            } else {
                params = { page: page, size: size, responsible: filtro, type: tipo };
            }
        }
        return this.http.get<GoalPagedResponse>(`${this.API}/search`, { params });
    }
    create(goal: GoalRequest): Observable<GoalResultResponse> {
        return this.http.post<GoalResultResponse>(this.API, goal);
    }
    update(id: number, goal: GoalRequest): Observable<GoalResultResponse> {
        return this.http.put<GoalResultResponse>(`${this.API}/${id}`, goal);
    }
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API}/${id}`);
    }
}
