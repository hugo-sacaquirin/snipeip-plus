// src/app/modules/objetivos/models/objective.model.ts
export interface ObjectiveRequest {
  id?: number;
  name: string;
  description: string;
  type: string;
  code: string;
  eje: string;
  status: string;
}

export interface ObjectiveResponse extends ObjectiveRequest {
  createdAt?: string;
  updatedAt?: string;
}

export interface ObjectiveResultResponse {
  code: string;
  result: string;
}

export interface ObjectivePagedResponse {
  content: ObjectiveResponse[];
  // Puedes agregar totalPages, totalElements si tu backend lo retorna
}
