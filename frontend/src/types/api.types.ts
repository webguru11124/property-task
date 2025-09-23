export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  metadata?: ResponseMetadata;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
}

export interface ResponseMetadata {
  timestamp: string;
  requestId?: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, unknown>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: unknown;
  timeout?: number;
}