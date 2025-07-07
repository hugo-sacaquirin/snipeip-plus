export interface EntityRequest {
  id?: number;
  name: string;
  code: string;
  subSector: string;
  level: string;
  status: string;
}

export interface EntityResponse {
  id: number;
  name: string;
  code: string;
  subSector: string;
  level: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface EntityResultResponse {
  code: string;
  result: string;
}

export interface EntityPagedResponse {
  content: EntityResponse[];
  totalPages?: number;
  totalElements?: number;
}
