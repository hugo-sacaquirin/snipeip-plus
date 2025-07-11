import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlineacionRequest, AlineacionResultResponse } from '../models/alineacion.model';

@Injectable({ providedIn: 'root' })
export class AlineacionesService {
  private readonly API = 'http://localhost:8081/objective-alignments';

  constructor(private http: HttpClient) {}

  createAlineacion(req: AlineacionRequest): Observable<AlineacionResultResponse> {
    return this.http.post<AlineacionResultResponse>(this.API, req);
  }
}
