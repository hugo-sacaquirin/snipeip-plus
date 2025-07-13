export interface AlineacionRequest {
  strategicObjectiveId: number;
  pndId: number;
  odsId: number;
  entityId: number;
}
export interface AlineacionResultResponse {
  code: string;
  result: string;
}
export interface ObjectiveAlignmentResponse {
  id: number;
  strategicObjective: any; // puedes tipar mejor si tienes modelo
  pnd: any;
  ods: any;
  entity: any;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ObjectiveAlignmentPagedResponse {
  content: ObjectiveAlignmentResponse[];
  totalPages?: number;
  totalElements?: number;
  number?: number;
  size?: number;
}
