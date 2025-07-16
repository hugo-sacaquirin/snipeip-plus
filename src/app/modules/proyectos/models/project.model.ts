// src/app/modules/proyectos/models/project.model.ts
export interface GoalResponse {
  id: number;
  name: string;
  description: string;
}

export interface ProjectRequest {
  id?: number;
  name: string;
  code: string;
  projectType: string;
  executionPeriod: string;
  estimatedBudget: number;
  geographicLocation: string;
  status: string;
  goalIds: number[];
}

export interface ProjectResponse {
  id: number;
  name: string;
  code: string;
  projectType: string;
  executionPeriod: string;
  estimatedBudget: number;
  geographicLocation: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  goals: GoalResponse[];
}

export interface ProjectPagedResponse {
  content: ProjectResponse[];
}
