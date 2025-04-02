import { Response } from "express";

export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface HttpRequest {
  method: string;
  body?: any;
  query?: Record<string, string | undefined>;
  params?: Record<string, string | undefined>;
  user?: {
    id: string;
    role: string;
  };
}
