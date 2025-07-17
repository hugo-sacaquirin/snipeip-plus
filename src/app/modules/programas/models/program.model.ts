// src/app/modules/programas/models/program.model.ts
export interface ProgramRequest {
  id?: number;
  name: string;
  description: string;
  scope?: string;
  responsible: string;
  status: string;
  projectIds: number[];
}

export interface ProjectSummary {
  id: number;
  name: string;
  projectType: string;
}

export interface ProgramResponse {
  id: number;
  name: string;
  description: string;
  scope?: string;
  responsible: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  projects: ProjectSummary[];
}

export interface ProgramPagedResponse {
  content: ProgramResponse[];
}
