// src/app/modules/metas/models/goal.model.ts
export interface GoalRequest {
  id?: number;
  name: string;
  description: string;
  period: string;
  unitOfMeasure: string;
  expectedValue: number;
  responsible: string;
  status?: string;
}
export interface GoalResponse extends GoalRequest {
  id: number;
  createdAt: string;
  updatedAt: string;
}
export interface GoalPagedResponse {
  content: GoalResponse[];
}
export interface GoalResultResponse {
  code: string;
  result: string;
}
