// src/app/modules/planes/models/plan.model.ts
export interface PlanRequest {
  id?: number;
  name: string;
  version: string;
  periodStart: string;
  periodEnd: string;
  planStatus: string; // ejemplo: 'CREATED', 'IN_REVIEW', 'APPROVED', 'RETURNED'
  status: string;     // ejemplo: 'ACTIVE', 'INACTIVE'
  institutionalObjectiveAlignmentIds: number[];
  programIds: number[];
}

export interface InstitutionalObjectivesSummary {
  id: number;
  strategicObjective: string;
  pndObjective: string;
  odsObjective: string;
}

export interface ProgramSummary {
  id: number;
  name: string;
  scope: string;
}

export interface PlanResponseSummary {
  id: number;
  name: string;
  version: string;
  periodStart: string;
  periodEnd: string;
  planStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  institutionalObjectives: InstitutionalObjectivesSummary[];
  programs: ProgramSummary[];
}

export interface PlanPagedResponse {
  content: PlanResponseSummary[];
}

export interface PlanApprovalRequest {
  observations?: string;
  status?: string;
}
